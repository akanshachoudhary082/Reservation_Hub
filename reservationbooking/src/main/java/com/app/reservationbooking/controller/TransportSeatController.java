package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.service.TransportSeatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/seats")
public class TransportSeatController {

    @Autowired
    private TransportSeatServiceImpl transportSeatService;

    // Get all seats for a service detail ID
    @GetMapping("/service/{detailId}")
    public ResponseEntity<List<TransportSeatDTO>> getSeatsByServiceDetailId(@PathVariable Long detailId) {
        List<TransportSeatDTO> seats = transportSeatService.getSeatsByServiceDetailId(detailId);
        return ResponseEntity.ok(seats);
    }

    // Create a new seat
    @PostMapping("/")
    public ResponseEntity<TransportSeatDTO> createSeat(@RequestBody TransportSeatDTO transportSeatDTO) {
        TransportSeatDTO createdSeat = transportSeatService.createSeat(transportSeatDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSeat);
    }

    // Update an existing seat
    @PutMapping("/{seatId}")
    public ResponseEntity<TransportSeatDTO> updateSeat(@PathVariable Long seatId, @RequestBody TransportSeatDTO transportSeatDTO) {
        TransportSeatDTO updatedSeat = transportSeatService.updateSeat(seatId, transportSeatDTO);
        return ResponseEntity.ok(updatedSeat);
    }

    // Delete a seat by ID
    @DeleteMapping("/{seatId}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long seatId) {
        transportSeatService.deleteSeat(seatId);
        return ResponseEntity.noContent().build();
    }

    // Get available seats for a service detail ID
    @GetMapping("/available/{detailId}")
    public ResponseEntity<List<TransportSeatDTO>> getAvailableSeatsByDetailId(@PathVariable Long detailId) {
        List<TransportSeatDTO> availableSeats = transportSeatService.getSeatsByServiceDetailId(detailId);
        return ResponseEntity.ok(availableSeats);
    }

    // Check if seats are available for a service detail ID
    @GetMapping("/availability/{detailId}")
    public ResponseEntity<Boolean> checkSeatAvailability(@PathVariable Long detailId) {
        boolean isAvailable = transportSeatService.areSeatsAvailableByDetailId(detailId);
        return ResponseEntity.ok(isAvailable);
    }
}
