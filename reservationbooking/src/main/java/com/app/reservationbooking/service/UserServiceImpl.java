package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespSignup;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.UserRepository;
import com.app.reservationbooking.utility.UserConverterUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userDao;

    @Override
    public UserRespSignup userRegistration(UserRespSignup dto) {
        User user = UserConverterUtils.convertToEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserConverterUtils.convertToDTO(savedUser);
    }



    @Override
    public UserRespSignup getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserConverterUtils.convertToDTO(user);
    }

    @Override
    public List<UserRespSignup> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserRespSignup createUser(UserRespSignup userRespDTO) {

        User user = UserConverterUtils.convertToEntity(userRespDTO);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword( passwordEncoder. encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserConverterUtils.convertToDTO(savedUser);
    }

    @Override
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

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
