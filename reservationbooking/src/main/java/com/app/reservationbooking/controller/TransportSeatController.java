package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.service.TransportSeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/seats")
@RequiredArgsConstructor
@Slf4j
public class TransportSeatController {

    private final TransportSeatService transportSeatService;

    @GetMapping("/admin/{adminConfigId}")
    public ResponseEntity<List<TransportSeatDTO>> getSeatsByAdminConfig(@PathVariable Long adminConfigId) {
        log.info("Fetching seats for AdminConfig ID: {}", adminConfigId);
        return ResponseEntity.ok(transportSeatService.getSeatsByAdminConfigId(adminConfigId));
    }

    @PostMapping
    public ResponseEntity<TransportSeatDTO> createSeat(@RequestBody TransportSeatDTO dto) {
        log.info("Received request to create seat: {}", dto);
        return ResponseEntity.ok(transportSeatService.createSeat(dto));
    }

    @PutMapping("/{seatId}")
    public ResponseEntity<TransportSeatDTO> updateSeat(@PathVariable Long seatId, @RequestBody TransportSeatDTO dto) {
        log.info("Received request to update seat ID {}: {}", seatId, dto);
        return ResponseEntity.ok(transportSeatService.updateSeat(seatId, dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransportSeatDTO>> getAllSeats() {
        log.info("Fetching all seats");
        return ResponseEntity.ok(transportSeatService.getAllSeats());
    }

    @DeleteMapping("/{seatId}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long seatId) {
        log.info("Received request to delete seat ID: {}", seatId);
        transportSeatService.deleteSeat(seatId);
        return ResponseEntity.noContent().build();
    }
}
