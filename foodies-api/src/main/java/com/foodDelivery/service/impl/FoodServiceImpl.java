package com.foodDelivery.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.foodDelivery.entity.FoodEntity;
import com.foodDelivery.helpers.AppConstants;
import com.foodDelivery.io.FoodRequest;
import com.foodDelivery.io.FoodResponse;
import com.foodDelivery.repository.FoodRepository;
import com.foodDelivery.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private FoodRepository foodRepository;


    @Override
    public Map<String, String> uploadFile(MultipartFile file)   {
        if (file == null || file.isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Image file is missing or empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/"))
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Only image files are allowed");
        }

        try
        {
            String publicId = UUID.randomUUID().toString();
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "public_id", publicId,
                            "type", "upload"
                    )
            );
            String secureUrl = uploadResult.get("secure_url").toString();
            return Map.of(
                    "publicId", publicId,
                    "imageUrl", secureUrl
            );
        }
        catch (IOException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error occurred while uploading image to Cloudinary", e);
        }

    }


    @Override
    public String getUrlFromPublicId(String publicId) {

        return cloudinary
                .url()
                .transformation(
                        new Transformation<>()
                                .width(AppConstants.CONTACT_IMAGE_WIDTH)
                                .height(AppConstants.CONTACT_IMAGE_HEIGHT)
                                .crop(AppConstants.CONTACT_IMAGE_CROP))
                .generate(publicId);
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);
        Map<String, String> uploadData = uploadFile(file);
        newFoodEntity.setImageUrl(uploadData.get("imageUrl"));
        newFoodEntity.setImagePublicId(uploadData.get("publicId"));  // 🔥 IMPORTANT
        newFoodEntity = foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {

        List<FoodEntity> databaseEntries = foodRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {

        FoodEntity existingFood = foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found for the id:"+id));
        return convertToResponse(existingFood);
    }

    @Override
    public void deleteFood(String id) {

        FoodEntity food = foodRepository.findById(id).orElseThrow(() ->new RuntimeException("Food not found for id: " + id));
        try
        {
            // Try deleting image (optional safety)
            deleteFile(food.getImagePublicId());
        }
        catch (Exception e) {
            System.out.println("Image delete failed but continuing DB delete");
        }
        // ALWAYS delete DB record
        foodRepository.delete(food);
    }

    public boolean deleteFile(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(publicId,ObjectUtils.asMap("resource_type", "image"));
            return "ok".equals(result.get("result"));
        }
        catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error deleting file from Cloudinary", e);
        }
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }


}
