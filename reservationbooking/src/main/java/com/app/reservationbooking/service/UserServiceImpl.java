package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespSignup;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.UserRepository;
import com.app.reservationbooking.utility.UserConverterUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service implementation for managing user operations such as user registration, retrieval, updates, and deletion.
 * This service performs the business logic for handling user-related actions and interacts with the repository layer.
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userDao;

    /**
     * Registers a new user and encodes the user's password.
     *
     * @param dto the data transfer object containing the user details to be registered
     * @return the {@link UserRespSignup} object representing the registered user
     */
    @Override
    @Transactional
    public UserRespSignup userRegistration(UserRespSignup dto) {
        User user = UserConverterUtils.convertToEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserConverterUtils.convertToDTO(savedUser);
    }


    /**
     * Retrieves a user by their ID.
     *
     * @param userId the ID of the user to retrieve
     * @return the {@link UserRespSignup} object representing the user
     * @throws RuntimeException if the user with the specified ID is not found
     */
    @Override
    @Transactional
    public UserRespSignup getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserConverterUtils.convertToDTO(user);
    }

    /**
     * Retrieves all users in the system.
     *
     * @return a list of {@link UserRespSignup} objects representing all users
     */
    @Override
    public List<UserRespSignup> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Creates a new user and encodes the user's password before saving.
     *
     * @param userRespDTO the data transfer object containing the user details to be created
     * @return the {@link UserRespSignup} object representing the newly created user
     */
    @Override
    @Transactional
    public UserRespSignup createUser(UserRespSignup userRespDTO) {

        User user = UserConverterUtils.convertToEntity(userRespDTO);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword( passwordEncoder. encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserConverterUtils.convertToDTO(savedUser);
    }

    /**
     * Updates an existing user's information.
     *
     * @param userId the ID of the user to update
     * @param userRespDTO the data transfer object containing the updated user details
     * @return the {@link UserRespSignup} object representing the updated user
     * @throws RuntimeException if the user with the specified ID is not found
     */
    @Override
    @Transactional
    public UserRespSignup updateUser(Long userId, UserRespSignup userRespDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        existingUser.setFirstName(userRespDTO.getFirstName());
        existingUser.setLastName(userRespDTO.getLastName());
        existingUser.setMobileNumber(userRespDTO.getMobileNumber());
        existingUser.setUserEmail(userRespDTO.getUserEmail());
        existingUser.setRole(userRespDTO.getRole());


        User updatedUser = userRepository.save(existingUser);
        return UserConverterUtils.convertToDTO(updatedUser);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param userId the ID of the user to delete
     * @throws RuntimeException if the user with the specified ID is not found
     */
    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
