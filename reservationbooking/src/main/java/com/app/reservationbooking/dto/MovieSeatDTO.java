package com.app.reservationbooking.dto;

import com.app.reservationbooking.enums.SeatStatus;
import com.app.reservationbooking.enums.SeatType;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for Movie Seat information.
 */
@Getter
@NoArgsConstructor
public class MovieSeatDTO {

    private String seatNumber; // The number of the seat

    private SeatStatus status; // The current status of the seat (e.g., AVAILABLE, BOOKED)

    private double seatPrice; // The price of the ticket for this seat

    private SeatType seatType; // The type of the seat (e.g., VIP, GENERAL)

    /**
     * Constructor to create a MovieSeatDTO with specified seat number, status, price, and type.
     *
     * @param seatNumber the number of the seat
     * @param status the current status of the seat
     * @param seatPrice the price of the ticket for this seat
     * @param seatType the type of the seat
     */
    public MovieSeatDTO(String seatNumber, SeatStatus status, double seatPrice, SeatType seatType) {
        this.seatNumber = seatNumber;
        this.status = status;
        this.seatPrice = seatPrice;
        this.seatType = seatType;
    }
}