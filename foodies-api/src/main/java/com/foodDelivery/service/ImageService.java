package com.foodDelivery.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadFile(MultipartFile file);

    String getUrlFromPublicId(String publicId);
}
