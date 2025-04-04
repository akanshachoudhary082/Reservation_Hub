package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.UserRespDTO;
import java.util.List;

public interface UserService {

    UserRespDTO getUserById(Long userId);

    List<UserRespDTO> getAllUsers();

    UserRespDTO createUser(UserRespDTO userRespDTO);

    UserRespDTO updateUser(Long userId, UserRespDTO userRespDTO);

    void deleteUser(Long userId);
}
