package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.UserRespSignup;
import com.app.reservationbooking.entities.User;


public class UserConverterUtils {

    public static UserRespSignup convertToDTO(User user) {
        if (user == null) return null;

        return new UserRespSignup(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getMobileNumber(),
                user.getUserEmail(),
                user.getRole()
        );
    }

    public static User convertToEntity(UserRespSignup dto) {
        if (dto == null) return null;

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setMobileNumber(dto.getMobileNumber());
        user.setUserEmail(dto.getUserEmail());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword()); // will be encoded later
        return user;
    }
}
