package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportSeatDTO;

import java.util.List;

/**
 * Service interface for managing transport seats related to service details.
 */
public interface TransportSeatService {

    /**
     * Retrieves a list of transport seats associated with a specific service detail ID.
     *
     * @param detailId the ID of the service detail
     * @return list of TransportSeatDTOs for the given detailId
     */

    List<TransportSeatDTO> getSeatsByDetailId(Long detailId);

    /**
     * Retrieves all available transport seat records.
     *
     * @return list of all TransportSeatDTOs
     */
    List<TransportSeatDTO> getAllSeats();

    /**
     * Creates a new transport seat entry.
     *
     * @param transportSeatDTO the seat data to be created
     * @return the created TransportSeatDTO
     */
    TransportSeatDTO createSeat(TransportSeatDTO transportSeatDTO);

    /**
     * Updates an existing transport seat entry identified by seatId.
     *
     * @param seatId the ID of the seat to update
     * @param transportSeatDTO the new data for the seat
     * @return the updated TransportSeatDTO
     */

    TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO transportSeatDTO);

    /**
     * Deletes a transport seat entry by its ID.
     *
     * @param seatId the ID of the seat to delete
     */

    void deleteSeat(Long seatId);
}
