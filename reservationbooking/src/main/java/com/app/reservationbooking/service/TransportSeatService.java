package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportSeatDTO;

import java.util.List;

/**
 * Service interface for managing transport seats related to service details.
 */
public interface TransportSeatService {

    /**
     * Retrieves all seats for a specific service detail by its ID.
     *
     * @param detailId ID of the service detail.
     * @return List of TransportSeatDTO representing the seats for the given service detail.
     */
    List<TransportSeatDTO> getSeatsByServiceDetailId(Long detailId);

    /**
     * Creates a new seat for a transport service.
     *
     * @param transportSeatDTO DTO containing the details of the seat to be created.
     * @return The created TransportSeatDTO.
     */
    TransportSeatDTO createSeat(TransportSeatDTO transportSeatDTO);

    /**
     * Updates an existing transport seat with the provided details.
     *
     * @param seatId ID of the seat to be updated.
     * @param transportSeatDTO DTO containing updated data for the seat.
     * @return The updated TransportSeatDTO.
     */
    TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO transportSeatDTO);

    /**
     * Deletes a transport seat by its ID.
     *
     * @param seatId ID of the seat to be deleted.
     */
    void deleteSeat(Long seatId);
}
