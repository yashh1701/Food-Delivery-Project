package com.foodDelivery.service;

import com.foodDelivery.io.UserRequest;
import com.foodDelivery.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}

