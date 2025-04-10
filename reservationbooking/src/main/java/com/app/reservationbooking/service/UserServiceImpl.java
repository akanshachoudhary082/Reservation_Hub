package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespDTO;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.UserRepository;
import com.app.reservationbooking.utility.UserConverterUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserRespDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserConverterUtils.convertToDTO(user); // Using the utility method for conversion
    }

    @Override
    public List<UserRespDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserConverterUtils::convertToDTO) // Convert each User to UserRespDTO
                .collect(Collectors.toList());
    }

    @Override
    public UserRespDTO createUser(UserRespDTO userRespDTO) {

        User user = UserConverterUtils.convertToEntity(userRespDTO);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword( passwordEncoder. encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserConverterUtils.convertToDTO(savedUser); // Return the saved user as DTO
    }

    @Override
    public UserRespDTO updateUser(Long userId, UserRespDTO userRespDTO) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        existingUser.setFirstName(userRespDTO.getFirstName());
        existingUser.setLastName(userRespDTO.getLastName());
        existingUser.setMobileNumber(userRespDTO.getMobileNumber());
        existingUser.setUserEmail(userRespDTO.getUserEmail());
        existingUser.setCountryCode(userRespDTO.getCountryCode());
        existingUser.setRole(userRespDTO.getRole());


        User updatedUser = userRepository.save(existingUser);
        return UserConverterUtils.convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
