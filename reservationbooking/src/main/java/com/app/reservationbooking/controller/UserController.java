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

    /**
     * Registers a new user. If the email indicates administrative access, assigns ADMIN role.
     * Defaults to CUSTOMER role if none is provided.
     *
     * @param userRespSignup the signup request payload
     * @return the registered user with HTTP status 201 (Created)
     */
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

    /**
     * Authenticates a user and generates a JWT token, which is set in a secure, HTTP-only cookie.
     *
     * @param request the signin credentials
     * @param response the HTTP response to which the JWT cookie is added
     * @return the JWT token and authentication success message
     */
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


    /**
     * Logs out the user by clearing the JWT cookie.
     *
     * @param request the HTTP request
     * @param response the HTTP response to which the cleared cookie is added
     * @return a success message indicating logout
     */
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

    /**
     * Retrieves a list of all registered users.
     *
     * @return list of users
     */
    @GetMapping
    public List<UserRespSignup> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Retrieves a specific user by their ID.
     *
     * @param id the ID of the user to retrieve
     * @return the user details
     * @throws ResourceNotFoundException if the user is not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserRespSignup> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        UserRespSignup userRespDTO = userService.getUserById(id);
        return ResponseEntity.ok(userRespDTO);
    }

    /**
     * Updates the details of an existing user.
     *
     * @param id the ID of the user to update
     * @param userRespDTO the updated user data
     * @return the updated user details
     * @throws ResourceNotFoundException if the user is not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserRespSignup> updateUser(@PathVariable Long id, @RequestBody UserRespSignup userRespDTO) throws ResourceNotFoundException {
        UserRespSignup updatedUser = userService.updateUser(id, userRespDTO);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id the ID of the user to delete
     * @return HTTP 204 (No Content) if deletion is successful
     * @throws ResourceNotFoundException if the user is not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
