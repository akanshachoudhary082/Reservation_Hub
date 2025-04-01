package com.app.reservationbooking.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.reservationbooking.dto.OtpRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class OtpController {
	
	@PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        Map<String, String> response = new HashMap<>();

        try {
            // Generate a verification code (you can use a more secure method)
            String verificationCode = String.valueOf((int) (Math.random() * 900000) + 100000);

            // Here you would typically send the OTP via SMS using Firebase or another service
            // For demonstration, we'll just log it
            System.out.println("OTP for " + phoneNumber + ": " + verificationCode);

            // Respond with the verification code (in a real app, you would not send this back)
            response.put("verificationCode", verificationCode);
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Failed to send OTP");
            return response;
        }
    }

    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request) {
        String verificationCode = request.get("verificationCode");
        // Here you would verify the OTP against the stored value
        // For demonstration, we'll assume the verification code is valid
        Map<String, String> response = new HashMap<>();

        if (verificationCode.equals("123456")) { // Replace with actual verification logic
            response.put("message", "OTP verified successfully");
        } else {
            response.put("error", "Invalid OTP");
        }

        return response;
    }

	

}
