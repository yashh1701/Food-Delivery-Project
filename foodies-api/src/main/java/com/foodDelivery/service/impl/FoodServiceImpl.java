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
    public String uploadFile(MultipartFile file) {
        /*This method is for uploading food image to cloudinary and return the url of that image.
            then we can store that url in database*/

        // 1. Validate file
        if (file == null || file.isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Image file is missing or empty");
        }

        // 2. Validate file type
        String contentType = file.getContentType();
        if (!contentType.startsWith("image/"))
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST ,"Only image files are allowed");
        }

        try {
            // 3. Upload image to Cloudinary (PUBLIC + IMAGE)
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),                    // ✅ correct way
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "type", "upload"              // ✅ public delivery
                    )
            );

            // 4. Return Cloudinary secure URL (DO NOT generate manually)
            return uploadResult.get("secure_url").toString();

        }
        catch (IOException e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error occurred while uploading image to Cloudinary",e);
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
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
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

        FoodResponse response = readFood(id);
        String imageUrl = response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean isFileDelete = deleteFile(filename);
        if (isFileDelete) {
            foodRepository.deleteById(response.getId());
        }
    }

    @Override
    public boolean deleteFile(String filename) {
        return false;
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
