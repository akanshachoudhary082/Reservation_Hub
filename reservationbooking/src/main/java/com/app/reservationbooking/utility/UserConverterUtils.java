package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.UserRespSignup;
import com.app.reservationbooking.entities.User;

/**
 * Utility class for converting between User entities and UserRespSignup DTOs.
 * This class provides methods to transform data between the entity layer (used for database operations)
 * and the DTO layer (used for API communication, particularly for user registration and management).
 */

public class UserConverterUtils {

    /**
     * Converts a User entity to a UserRespSignup DTO.
     * This method extracts relevant fields from the User entity and maps them to a DTO for use in API responses.
     *
     * @param user the User entity to convert
     * @return the UserRespSignup DTO representing the User entity
     */
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

    /**
     * Converts a UserRespSignup DTO to a User entity.
     * This method extracts fields from the DTO and creates a User entity suitable for database storage.
     *
     * @param dto the UserRespSignup DTO to convert
     * @return the User entity representing the UserRespSignup DTO
     */

    public static User convertToEntity(UserRespSignup dto) {
        if (dto == null) return null;

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setMobileNumber(dto.getMobileNumber());
        user.setUserEmail(dto.getUserEmail());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword());
        return user;
    }
}
