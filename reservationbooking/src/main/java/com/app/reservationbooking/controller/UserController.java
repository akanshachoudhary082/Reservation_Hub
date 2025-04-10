package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.UserRespDTO;
import com.app.reservationbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping
    public List<UserRespDTO> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserRespDTO> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        UserRespDTO userRespDTO = userService.getUserById(id);
        return ResponseEntity.ok(userRespDTO);
    }

    // Create a new user
    @PostMapping("/register")
    public ResponseEntity<UserRespDTO> createUser(@RequestBody UserRespDTO userRespDTO) {
        UserRespDTO createdUser = userService.createUser(userRespDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserRespDTO> updateUser(@PathVariable Long id, @RequestBody UserRespDTO userRespDTO) throws ResourceNotFoundException {
        UserRespDTO updatedUser = userService.updateUser(id, userRespDTO);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }
}
