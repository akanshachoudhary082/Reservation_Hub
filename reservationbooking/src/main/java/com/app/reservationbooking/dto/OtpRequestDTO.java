package com.app.reservationbooking.dto;

import jakarta.validation.constraints.NotBlank;

public class OtpRequestDTO {
	
	@NotBlank(message = "Mobile number is required")
	private String mobileNumber;

	public OtpRequestDTO() {
	
	}

	public OtpRequestDTO(String mobileNumber) {
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
