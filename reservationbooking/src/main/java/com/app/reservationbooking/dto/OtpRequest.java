package com.app.reservationbooking.dto;

import jakarta.validation.constraints.NotBlank;

public class OtpRequest {
	
	@NotBlank(message = "Mobile number is required")
	//@Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid mobile number format")
	private String mobileNumber;

	public OtpRequest() {
	
	}

	public OtpRequest(String mobileNumber) {
		super();
		this.mobileNumber = mobileNumber;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	
}
