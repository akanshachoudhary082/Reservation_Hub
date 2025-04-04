package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.UserRespDTO;
import com.app.reservationbooking.entities.User;

public class UserConverterUtils {

    // Convert User entity to UserRespDTO
    public static UserRespDTO convertToDTO(User user) {
        if (user == null) {
            return null;
        }
        return new UserRespDTO(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getMobileNumber(),
                user.getUserEmail(),
                user.getRole(),
                user.getPassword()
        );
    }

    // Convert UserRespDTO to User entity
    public static User convertToEntity(UserRespDTO userRespDTO) {
        if (userRespDTO == null) {
            return null;
        }
        User user = new User();
        user.setFirstName(userRespDTO.getFirstName());
        user.setLastName(userRespDTO.getLastName());
        user.setMobileNumber(userRespDTO.getMobileNumber());
        user.setUserEmail(userRespDTO.getUserEmail());
        user.setRole(userRespDTO.getRole());
        user.setPassword(userRespDTO.getPassword());
        return user;
    }
}
