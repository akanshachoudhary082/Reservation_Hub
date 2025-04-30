package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.service.TransportBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class TransportBookingController {

    private final TransportBookingService transportBookingService;

    @PostMapping("/create-bookings")
    public ResponseEntity<TransportBookingDTO> createBooking(@RequestBody TransportBookingDTO dto) {
        return ResponseEntity.ok(transportBookingService.createBooking(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportBookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(transportBookingService.getBookingById(id));
    }

    @GetMapping("/all-bookings")
    public ResponseEntity<List<TransportBookingDTO>> getAllBookings() {
        return ResponseEntity.ok(transportBookingService.getAllBookings());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransportBookingDTO> updateBooking(
            @PathVariable Long id,
            @RequestBody TransportBookingDTO dto) {
        return ResponseEntity.ok(transportBookingService.updateBooking(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        transportBookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
