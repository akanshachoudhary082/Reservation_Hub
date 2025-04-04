package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.ServiceDetailsDTO;
import com.app.reservationbooking.service.ServiceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/details")
public class ServiceDetailsController {

    @Autowired
    private ServiceDetailsService detailsService;

    // Get all details
    @GetMapping
    public List<ServiceDetailsDTO> getAllDetails() {
        return detailsService.getAllDetails();
    }

    // Get details by ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceDetailsDTO> getDetailsById(@PathVariable Long id) throws ResourceNotFoundException {
        ServiceDetailsDTO detailsDTO = detailsService.getDetailsById(id);
        return ResponseEntity.ok(detailsDTO);
    }

    // Create new details
    @PostMapping("/create-details")
    public ResponseEntity<ServiceDetailsDTO> createDetails(@RequestBody ServiceDetailsDTO detailsDTO) {
        ServiceDetailsDTO createdDetails = detailsService.createDetails(detailsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDetails);
    }

    // Update details by ID
    @PutMapping("/{id}")
    public ResponseEntity<ServiceDetailsDTO> updateDetails(@PathVariable Long id, @RequestBody ServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
        ServiceDetailsDTO updatedDetails = detailsService.updateDetails(id, detailsDTO);
        return ResponseEntity.ok(updatedDetails);
    }

    // Delete details by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetails(@PathVariable Long id) throws ResourceNotFoundException {
        detailsService.deleteDetails(id);
        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }
}
