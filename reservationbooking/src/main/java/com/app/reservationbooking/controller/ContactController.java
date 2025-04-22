package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.EmailServiceException; // Custom exception
import com.app.reservationbooking.dto.ContactRequestDTO;
import com.app.reservationbooking.service.ContactService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;


    @GetMapping
    public ResponseEntity<String> getContactForm() {
        return ResponseEntity.ok("Contact form page");
    }

    @PostMapping
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactRequestDTO contactRequestDTO) {
        try {
            contactService.sendEmail(contactRequestDTO);
            return ResponseEntity.ok("Message sent successfully!");
        } catch (EmailServiceException e) {

            log.error("Email sending failed: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Failed to send the message: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error occurred: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

}
