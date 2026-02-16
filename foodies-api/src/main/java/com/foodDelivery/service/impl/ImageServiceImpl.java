package com.foodDelivery.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.foodDelivery.helpers.AppConstants;
import com.foodDelivery.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {
        /*This method is for uploading food image to cloudinary and return the url of that image.
            then we can store that url in database*/
        String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key = UUID.randomUUID() + "." + filenameExtension;

        try {
            byte[] data = new byte[file.getInputStream().available()];
           file.getInputStream().read(data);
            cloudinary.uploader().upload(data, ObjectUtils.asMap("public_id", key));
            return this.getUrlFromPublicId(key);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"An error occurred while uploading file to cloudinary");
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
}
