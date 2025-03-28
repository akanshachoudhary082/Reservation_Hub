package com.app.reservationbooking.controller;

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
	public ResponseEntity<?> sendOtp(@RequestBody @Valid OtpRequest  dOtpRequest){
		
		String mobileNumber = dOtpRequest.getMobileNumber();
		
		return ResponseEntity.ok("OTP has been sent to your mobile number");
		
	}

	

}
