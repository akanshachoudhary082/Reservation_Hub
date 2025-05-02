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

    /**
     * Retrieves a list of transport seats based on the given service detail ID.
     *
     * @param detailId the ID associated with the transport service detail
     * @return a list of matching transport seat DTOs with HTTP status 200 (OK)
     */
    @GetMapping("/service/{detailId}")
    public ResponseEntity<List<TransportSeatDTO>> getSeatsByDetail(@PathVariable Long detailId) {
        log.info("Fetching seats for AdminConfig ID: {}", detailId);
        return ResponseEntity.ok(transportSeatService.getSeatsByDetailId(detailId));
    }

    /**
     * Creates a new transport seat record.
     *
     * @param dto the transport seat DTO containing seat details
     * @return the created seat details with HTTP status 200 (OK)
     */
    @PostMapping
    public ResponseEntity<TransportSeatDTO> createSeat(@RequestBody TransportSeatDTO dto) {
        log.info("Received request to create seat: {}", dto);
        return ResponseEntity.ok(transportSeatService.createSeat(dto));
    }

    /**
     * Updates an existing transport seat by seat ID.
     *
     * @param seatId the ID of the seat to update
     * @param dto the updated seat data
     * @return the updated seat details with HTTP status 200 (OK)
     */
    @PutMapping("/{seatId}")
    public ResponseEntity<TransportSeatDTO> updateSeat(@PathVariable Long seatId, @RequestBody TransportSeatDTO dto) {
        log.info("Received request to update seat ID {}: {}", seatId, dto);
        return ResponseEntity.ok(transportSeatService.updateSeat(seatId, dto));
    }

    /**
     * Retrieves all transport seats.
     *
     * @return a list of all transport seats with HTTP status 200 (OK)
     */
    @GetMapping("/all")
    public ResponseEntity<List<TransportSeatDTO>> getAllSeats() {
        log.info("Fetching all seats");
        return ResponseEntity.ok(transportSeatService.getAllSeats());
    }

    /**
     * Deletes a transport seat by seat ID.
     *
     * @param seatId the ID of the seat to delete
     * @return HTTP status 204 (No Content) if deletion is successful
     */
    @DeleteMapping("/{seatId}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long seatId) {
        log.info("Received request to delete seat ID: {}", seatId);
        transportSeatService.deleteSeat(seatId);
        return ResponseEntity.noContent().build();
    }
}
