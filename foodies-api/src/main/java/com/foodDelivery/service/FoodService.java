package com.foodDelivery.service;

import com.foodDelivery.io.FoodRequest;
import com.foodDelivery.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FoodService {

    public Map<String, String> uploadFile(MultipartFile file);
    String getUrlFromPublicId(String publicId);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFile(String filename);

    void deleteFood(String id);
}
