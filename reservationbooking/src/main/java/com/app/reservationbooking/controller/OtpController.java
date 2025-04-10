//package com.app.reservationbooking.controller;
//
//import java.util.HashMap;
//import java.util.Map;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api")
//public class OtpController {
//
//	@PostMapping("/send-otp")
//    public Map<String, String> sendOtp(@RequestBody Map<String, String> request) {
//
//        String phoneNumber = request.get("phoneNumber");
//
//        Map<String, String> response = new HashMap<>();
//
//        try {
//
//            String verificationCode = String.valueOf((int) (Math.random() * 900000) + 100000);
//
//            System.out.println(verificationCode);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            response.put("error", "Failed to send OTP");
//            return response;
//        }
//		return response;
//    }
//
//    @PostMapping("/verify-otp")
//    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request) {
//
//        String verificationCode = request.get("verificationCode");
//
//        Map<String, String> response = new HashMap<>();
//
//        //if (verificationCode.equals("123456")) {
//          //  response.put("message", "OTP verified successfully");
//        //} else {
//          //  response.put("error", "Invalid OTP");
//        //}
//
//        return response;
//    }
//
//
//
//}
