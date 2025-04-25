package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportSeatDTO;

import java.util.List;

/**
 * Service interface for managing transport seats related to service details.
 */
public interface TransportSeatService {


    List<TransportSeatDTO> getSeatsByAdminConfigId(Long adminConfigId);


    List<TransportSeatDTO> getAllSeats();

    TransportSeatDTO createSeat(TransportSeatDTO transportSeatDTO);


    TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO transportSeatDTO);


    void deleteSeat(Long seatId);
}
