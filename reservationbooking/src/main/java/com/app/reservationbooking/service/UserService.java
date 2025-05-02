package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespSignup;
import java.util.List;

/**
 * Service interface for managing user operations such as user registration, retrieval, updates, and deletion.
 * Provides methods to handle user-related business logic for the system.
 */

public interface UserService {

    /**
     * Registers a new user in the system.
     *
     * @param userRespDTO the data transfer object containing the user details to be registered
     * @return the {@link UserRespSignup} object representing the registered user
     */
    UserRespSignup userRegistration(UserRespSignup userRespDTO);

    /**
     * Retrieves a user by their ID.
     *
     * @param userId the ID of the user to retrieve
     * @return the {@link UserRespSignup} object representing the user
     *
     */

    UserRespSignup getUserById(Long userId);

    /**
     * Retrieves all users in the system.
     *
     * @return a list of {@link UserRespSignup} objects representing all users
     */
    List<UserRespSignup> getAllUsers();

    /**
     * Creates a new user in the system.
     *
     * @param userRespDTO the data transfer object containing the user details to be created
     * @return the {@link UserRespSignup} object representing the newly created user
     */

    UserRespSignup createUser(UserRespSignup userRespDTO);

    /**
     * Updates an existing user.
     *
     * @param userId the ID of the user to update
     * @param userRespDTO the data transfer object containing the updated user details
     * @return the {@link UserRespSignup} object representing the updated user
     *
     */
    UserRespSignup updateUser(Long userId, UserRespSignup userRespDTO);

    /**
     * Deletes a user by their ID.
     *
     * @param userId the ID of the user to delete
     */
    void deleteUser(Long userId);
}
