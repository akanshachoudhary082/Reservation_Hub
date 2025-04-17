package com.app.reservationbooking.controller;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.TransportDTO;
import com.app.reservationbooking.service.TransportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/transport")
@Slf4j
public class TransportController {

    @Autowired
    private TransportService transportService;

    /**
     * POST endpoint to search for available transport services (Bus, Train, Flight)
     * based on criteria sent in TransportDTO (date, source, destination, module code).
     *
     * @param transportDTO Search criteria including availableOn, moduleCode, sourceCity, destinationCity
     * @return List of matching TransportDTOs if available; otherwise, an empty list
     */
    @PostMapping("/search")
    public ResponseEntity<List<TransportDTO>> searchAvailableTransports(@RequestBody TransportDTO transportDTO) {
        List<TransportDTO> transports = transportService.searchAvailableTransports(transportDTO);
        return ResponseEntity.ok(transports);
    }


}
