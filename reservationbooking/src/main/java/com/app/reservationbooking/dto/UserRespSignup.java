package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserRespSignup extends BaseEntity {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long userId;

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String userEmail;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is required")
    @Length(min = 8, max = 20, message = "Password length should be between 8 and 20 characters")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character")
    private String password;

    
    private Role role;

    private String captcha;
    private String captchaInput;

    // Constructor used for response (without exposing password)
    public UserRespSignup(Long userId, String firstName, String lastName, String mobileNumber, String userEmail, Role role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNumber = mobileNumber;
        this.userEmail = userEmail;
        this.role = role;
    }


    public void setPassword(String password) {
        this.password = password != null ? password.trim() : null;
    }




}
