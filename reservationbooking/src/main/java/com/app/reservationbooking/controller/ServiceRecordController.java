package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.service.ServiceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/services")
public class ServiceRecordController {

    @Autowired
    private ServiceRecordService serviceRecordService;

    // Get all services
    @GetMapping
    public List<ServiceRecordDTO> getAllServices() {
        return serviceRecordService.getAllServices();
    }

    // Get service by ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceRecordDTO> getServiceById(@PathVariable Long id) throws ResourceNotFoundException {
        ServiceRecordDTO serviceRecordDTO = serviceRecordService.getServiceById(id);
        return ResponseEntity.ok(serviceRecordDTO);
    }

    // Create new service
    @PostMapping("/create-service")
    public ResponseEntity<ServiceRecordDTO> createService(@RequestBody ServiceRecordDTO serviceRecordDTO) {
        ServiceRecordDTO createdService = serviceRecordService.createService(serviceRecordDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
    }

    // Update service by ID
    @PutMapping("/{id}")
    public ResponseEntity<ServiceRecordDTO> updateService(@PathVariable Long id, @RequestBody ServiceRecordDTO serviceRecordDTO) throws ResourceNotFoundException {
        ServiceRecordDTO updatedService = serviceRecordService.updateService(id, serviceRecordDTO);
        return ResponseEntity.ok(updatedService);
    }

    // Delete service by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) throws ResourceNotFoundException {
        serviceRecordService.deleteService(id);
        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }
}
