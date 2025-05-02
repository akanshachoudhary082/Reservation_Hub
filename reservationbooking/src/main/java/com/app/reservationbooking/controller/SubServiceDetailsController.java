//package com.app.reservationbooking.controller;
//
//import com.app.reservationbooking.customexception.ResourceNotFoundException;
//import com.app.reservationbooking.dto.ServiceDetailsDTO;
//import com.app.reservationbooking.service.ServiceDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/details")
//public class ServiceDetailsController {
//
//    @Autowired
//    private ServiceDetailsService detailsService;
//
//
//    @GetMapping
//    public List<ServiceDetailsDTO> getAllDetails() {
//        return detailsService.getAllDetails();
//    }
//
//
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ServiceDetailsDTO> getDetailsById(@PathVariable Long id) throws ResourceNotFoundException {
//        ServiceDetailsDTO detailsDTO = detailsService.getDetailsById(id);
//        return ResponseEntity.ok(detailsDTO);
//    }
//
//
//    @PostMapping("/create-details")
//    public ResponseEntity<ServiceDetailsDTO> createDetails(@RequestBody ServiceDetailsDTO detailsDTO) {
//        ServiceDetailsDTO createdDetails = detailsService.createDetails(detailsDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdDetails);
//    }
//
//
//    @PutMapping("/{id}")
//    public ResponseEntity<ServiceDetailsDTO> updateDetails(@PathVariable Long id, @RequestBody ServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
//        ServiceDetailsDTO updatedDetails = detailsService.updateDetails(id, detailsDTO);
//        return ResponseEntity.ok(updatedDetails);
//    }
//
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDetails(@PathVariable Long id) throws ResourceNotFoundException {
//        detailsService.deleteDetails(id);
//        return ResponseEntity.noContent().build();  // HTTP 204 No Content
//    }
//}
//
package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.SubServiceDetailsDTO;
import com.app.reservationbooking.service.SubServiceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RestController
@RequestMapping("/details")
public class SubServiceDetailsController {

    @Autowired
    private SubServiceDetailsService detailsService;

    // Get all details
    /**
     * Retrieves all sub-service details.
     * Accessible by users with 'CUSTOMER' or 'ADMIN' authority.
     *
     * @return list of all SubServiceDetailsDTOs
     */
    @GetMapping
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")  // Customer and Admin can view details
    public List<SubServiceDetailsDTO> getAllDetails() {
        return detailsService.getAllDetails();
    }

    /**
     * Retrieves a specific sub-service detail by its ID.
     * Accessible by users with 'CUSTOMER' or 'ADMIN' authority.
     *
     * @param id the ID of the sub-service detail
     * @return the corresponding SubServiceDetailsDTO wrapped in a ResponseEntity
     * @throws ResourceNotFoundException if no record is found with the given ID
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")  // Customer and Admin can view details by ID
    public ResponseEntity<SubServiceDetailsDTO> getDetailsById(@PathVariable Long id) throws ResourceNotFoundException {
        SubServiceDetailsDTO detailsDTO = detailsService.getDetailsById(id);
        return ResponseEntity.ok(detailsDTO);
    }

    /**
     * Creates a new sub-service detail.
     * Accessible only by users with 'ADMIN' authority.
     *
     * @param detailsDTO the sub-service detail to be created
     * @return the created SubServiceDetailsDTO wrapped in a ResponseEntity with status 201 (Created)
     */
    @PostMapping("/create-details")
    @PreAuthorize("hasAuthority('ADMIN')")  // Only Admin can create service details
    public ResponseEntity<SubServiceDetailsDTO> createDetails(@RequestBody SubServiceDetailsDTO detailsDTO) {
        SubServiceDetailsDTO createdDetails = detailsService.createDetails(detailsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDetails);
    }

    /**
     * Updates an existing sub-service detail by ID.
     * Accessible only by users with 'ADMIN' authority.
     *
     * @param id the ID of the detail to update
     * @param detailsDTO the updated sub-service detail data
     * @return the updated SubServiceDetailsDTO wrapped in a ResponseEntity
     * @throws ResourceNotFoundException if no record is found with the given ID
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")  // Only Admin can update service details
    public ResponseEntity<SubServiceDetailsDTO> updateDetails(@PathVariable Long id, @RequestBody SubServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
        SubServiceDetailsDTO updatedDetails = detailsService.updateDetails(id, detailsDTO);
        return ResponseEntity.ok(updatedDetails);
    }

    /**
     * Deletes a sub-service detail by ID.
     * Accessible only by users with 'ADMIN' authority.
     *
     * @param id the ID of the detail to delete
     * @return a ResponseEntity with status 204 (No Content) if deletion is successful
     * @throws ResourceNotFoundException if no record is found with the given ID
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")  // Only Admin can delete service details
    public ResponseEntity<Void> deleteDetails(@PathVariable Long id) throws ResourceNotFoundException {
        detailsService.deleteDetails(id);
        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }
}
