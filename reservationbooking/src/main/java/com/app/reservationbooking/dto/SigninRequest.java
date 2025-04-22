//package com.app.reservationbooking.dto;
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotEmpty;
//import jakarta.validation.constraints.Pattern;
//import org.hibernate.validator.constraints.Length;
//
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//
//@Getter
//@Setter
//@ToString
//public class SigninRequest {
//
//    @NotEmpty(message = "Email can't be blank")
//    @Email(message = "Email should be valid")
//    private String email;
//    @NotEmpty
//    @Length(min = 3,max=20,message = "Invalid password length")
//    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email format is incorrect")
//    private String password;
//}

package com.app.reservationbooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SigninRequest {

    @NotEmpty(message = "Email can't be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Password can't be blank")
    @Length(min = 8, max = 20, message = "Password length should be between 8 and 20 characters")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character")
    private String password;


    public void setPassword(String password) {
        this.password = password != null ? password.trim() : null;
    }
}
