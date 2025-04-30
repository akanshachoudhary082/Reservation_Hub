package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportBookingDTO;

import java.util.List;

public interface TransportBookingService {

    TransportBookingDTO createBooking(TransportBookingDTO transportBookingDTO);

    TransportBookingDTO getBookingById(Long id);

    List<TransportBookingDTO> getAllBookings();

    TransportBookingDTO updateBooking(Long id, TransportBookingDTO transportBookingDTO);

    void deleteBooking(Long id);
}
