package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.entities.Booking;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.entities.User;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Utility class that provides methods to convert between Booking-related entities and their corresponding DTOs.
 * It also includes methods to convert related Seat and User entities, ensuring proper mapping between data models.
 */

public class TransportBookingConverterUtils {

    /**
     * Converts a single Booking entity into a TransportBookingDTO.
     *
     * @param entity the Booking entity to convert
     * @return the TransportBookingDTO representing the Booking entity, or null if the entity is null
     */
    // Convert a single Booking entity to DTO
    public static TransportBookingDTO convertToDTO(Booking entity) {
        if (entity == null) return null;

        return TransportBookingDTO.builder()
                .bookingId(entity.getBookingId())
                //.user(entity.getUser()) // Optional: include full user if needed
                .userId(entity.getUser() != null ? entity.getUser().getUserId() : null) // safer

                .passengerName(entity.getPassengerName())
                .mobileNumber(entity.getMobileNumber())
                .userEmail(entity.getUserEmail())
                .stateResidency(entity.getStateResidency())
                .seats(List.of(convertSeatToDTO(entity.getSeat())))
                .status(entity.getStatus())
                .bookingDate(entity.getBookingDate())
                .detailId(entity.getDetailId())
                .payment(entity.getPayment())
                .build();
    }

    // Updated to accept a User object explicitly
    /**
     * Converts a TransportBookingDTO into a list of Booking entities.
     * This method allows for a user to be associated with the booking when creating the entity.
     *
     * @param dto the TransportBookingDTO to convert
     * @param user the User entity to associate with the booking
     * @return a list of Booking entities converted from the DTO, or an empty list if the DTO or seats are null
     */
    public static List<Booking> convertToEntity(TransportBookingDTO dto, User user) {
        if (dto == null || dto.getSeats() == null) return Collections.emptyList();

        return dto.getSeats().stream().map(seatDTO -> {
            Booking booking = new Booking();
            booking.setUser(user); //  use full User object from DB
            //booking.setPassengerName(dto.getPassengerName());
            booking.setPassengerName(seatDTO.getPassengerName());
            booking.setMobileNumber(dto.getMobileNumber());
            booking.setUserEmail(dto.getUserEmail());
            booking.setStateResidency(dto.getStateResidency());
            booking.setSeat(convertDTOToSeat(seatDTO));
            booking.setStatus(dto.getStatus());
            booking.setBookingDate(dto.getBookingDate());
            booking.setDetailId(seatDTO.getDetailId());
            booking.setPayment(dto.getPayment());
            return booking;
        }).collect(Collectors.toList());
    }

    /**
     * Converts a TransportSeatDTO into a Seat entity.
     *
     * @param dto the TransportSeatDTO to convert
     * @return the Seat entity representing the DTO, or null if the DTO is null
     */
    private static Seat convertDTOToSeat(TransportSeatDTO dto) {
        if (dto == null) return null;

        Seat seat = new Seat();
        seat.setSeatId(dto.getSeatId());
        seat.setDetailId(dto.getDetailId());
        seat.setSeatNumber(dto.getSeatNumber());
        seat.setSeatType(dto.getSeatType());
        seat.setClassType(dto.getClassType());
        seat.setStatus(dto.getStatus());
        seat.setSeatPrice(dto.getSeatPrice());
        return seat;
    }

    /**
     * Converts a Seat entity into a TransportSeatDTO.
     *
     * @param seat the Seat entity to convert
     * @return the TransportSeatDTO representing the Seat entity, or null if the Seat is null
     */
    private static TransportSeatDTO convertSeatToDTO(Seat seat) {
        if (seat == null) return null;

        return TransportSeatDTO.builder()
                .seatId(seat.getSeatId())
                .detailId(seat.getDetailId())
                .seatNumber(seat.getSeatNumber())
                .seatType(seat.getSeatType())
                .classType(seat.getClassType())
                .status(seat.getStatus())
                .seatPrice(seat.getSeatPrice())
                .build();
    }
}


