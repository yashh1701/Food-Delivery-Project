package com.foodDelivery.service;


import com.foodDelivery.io.CartRequest;
import com.foodDelivery.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
