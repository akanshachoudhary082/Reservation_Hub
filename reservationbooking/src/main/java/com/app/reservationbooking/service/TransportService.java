package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportDTO;

import java.util.List;

/**
 * Service interface for transport-related operations such as searching available transport services.
 */
public interface TransportService {

    /**
     * Searches for available transport services based on the given search criteria.
     * The criteria may include source city, destination city, transport type (e.g., BUS, TRAIN),
     * and the date of availability.
     *
     * @param requestDTO The DTO containing search criteria like sourceCity, destinationCity,
     *                   moduleCode, and availableOn.
     * @return A list of matching TransportDTOs.
     */
    List<TransportDTO> searchAvailableTransports(TransportDTO requestDTO);
}
