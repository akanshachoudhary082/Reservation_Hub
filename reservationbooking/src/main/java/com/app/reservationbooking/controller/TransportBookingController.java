package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.service.TransportBookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RestController
@RequestMapping("/bookings")
@Slf4j
public class TransportBookingController {

    @Autowired
    private TransportBookingService transportBookingService;

    /**
     * Creates a new transport booking.
     *
     * @param dto the transport booking data transfer object containing booking details
     * @return the created booking with HTTP status 201 (Created)
     */
    @PostMapping
    public ResponseEntity<TransportBookingDTO> createBooking(@RequestBody TransportBookingDTO dto) {
        TransportBookingDTO createdBooking = transportBookingService.createBooking(dto);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    /**
     * Retrieves a booking by its ID.
     *
     * @param id the ID of the booking to retrieve
     * @return the booking details with HTTP status 200 (OK)
     */
    @GetMapping("/{id}")
    public ResponseEntity<TransportBookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(transportBookingService.getBookingById(id));
    }

    /**
     * Retrieves all transport bookings.
     *
     * @return a list of all bookings with HTTP status 200 (OK)
     */
    @GetMapping("/all-bookings")
    public ResponseEntity<List<TransportBookingDTO>> getAllBookings() {
        return ResponseEntity.ok(transportBookingService.getAllBookings());
    }

    /**
     * Updates an existing booking by its ID.
     *
     * @param id  the ID of the booking to update
     * @param dto the updated booking details
     * @return the updated booking with HTTP status 200 (OK)
     */
    @PutMapping("/{id}")
    public ResponseEntity<TransportBookingDTO> updateBooking(
            @PathVariable Long id,
            @RequestBody TransportBookingDTO dto) {
        return ResponseEntity.ok(transportBookingService.updateBooking(id, dto));
    }

    /**
     * Deletes a booking by its ID.
     *
     * @param id the ID of the booking to delete
     * @return HTTP status 204 (No Content) if deletion is successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        transportBookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
