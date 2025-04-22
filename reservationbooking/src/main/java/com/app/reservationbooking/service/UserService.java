package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespSignup;
import java.util.List;

public interface UserService {

    UserRespSignup userRegistration(UserRespSignup userRespDTO);


    UserRespSignup getUserById(Long userId);

    List<UserRespSignup> getAllUsers();

    UserRespSignup createUser(UserRespSignup userRespDTO);

    UserRespSignup updateUser(Long userId, UserRespSignup userRespDTO);

    void deleteUser(Long userId);
}
