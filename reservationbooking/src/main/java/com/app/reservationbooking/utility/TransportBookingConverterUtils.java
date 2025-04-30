package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.entities.Booking;

public class TransportBookingConverterUtils {

    public static TransportBookingDTO convertToDTO(Booking entity) {
        if (entity == null) return null;

        return TransportBookingDTO.builder()
                .bookingId(entity.getBookingId())
                .user(entity.getUser())
                .passengerName(entity.getPassengerName())
                .mobileNumber(entity.getMobileNumber())
                .userEmail(entity.getUserEmail())
                .seat(entity.getSeat())
                .status(entity.getStatus())
                .bookingDate(entity.getBookingDate())
                .detailId(entity.getDetailId())
                .payment(entity.getPayment())
                .build();
    }

    public static Booking convertToEntity(TransportBookingDTO dto) {
        if (dto == null) return null;

        return Booking.builder()
                .bookingId(dto.getBookingId())
                .user(dto.getUser())
                .passengerName(dto.getPassengerName())
                .mobileNumber(dto.getMobileNumber())
                .userEmail(dto.getUserEmail())
                .seat(dto.getSeat())
                .status(dto.getStatus())
                .bookingDate(dto.getBookingDate())
                .detailId(dto.getDetailId())
                .payment(dto.getPayment())
                .build();
    }
}
