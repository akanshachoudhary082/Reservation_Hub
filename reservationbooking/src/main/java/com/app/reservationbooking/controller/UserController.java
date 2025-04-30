package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.SigninRequest;
import com.app.reservationbooking.dto.SigninResponse;
import com.app.reservationbooking.dto.UserRespSignup;
import com.app.reservationbooking.enums.Role;
import com.app.reservationbooking.security.JwtUtils;
import com.app.reservationbooking.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.Cookie;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {


    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authMgr;

    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<?> userSignup(@RequestBody @Valid UserRespSignup userRespSignup) {
        String email = userRespSignup.getUserEmail().toLowerCase();

        if (email.endsWith(".in@gmail.com") || email.contains("admin")) {
            userRespSignup.setRole(Role.ADMIN);
        } else {
            if (userRespSignup.getRole() == null) {
                userRespSignup.setRole(Role.CUSTOMER);
            }
        }
        UserRespSignup responseDto = userService.userRegistration(userRespSignup);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }




    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninRequest request, HttpServletResponse response) {

        log.info("======= SIGNIN REQUEST =======");
        log.info("Email: {}", request.getEmail());
        log.info("Password: {}",request.getPassword());
        System.out.println("==============================");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword());

        Authentication verifiedToken = authMgr.authenticate(token);

        String jwt = jwtUtils.generateJwtToken(verifiedToken);

        Cookie cookie = new Cookie("jwtToken", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);


        SigninResponse resp = new SigninResponse(jwt, "Successful Auth!!!!");
        return ResponseEntity.ok(resp);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

        response.addCookie(cookie);
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping
    public List<UserRespSignup> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserRespSignup> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        UserRespSignup userRespDTO = userService.getUserById(id);
        return ResponseEntity.ok(userRespDTO);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserRespSignup> updateUser(@PathVariable Long id, @RequestBody UserRespSignup userRespDTO) throws ResourceNotFoundException {
        UserRespSignup updatedUser = userService.updateUser(id, userRespDTO);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
