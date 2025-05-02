package com.app.reservationbooking.dto;

import com.app.reservationbooking.enums.SeatStatus;
import com.app.reservationbooking.enums.SeatType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EventSeatDTO {
    private String seatNumber;

    private SeatStatus status;

    private double seatPrice;

    private SeatType seatType;

    public EventSeatDTO(String seatNumber, SeatStatus status, double seatPrice, SeatType seatType) {
        this.seatNumber = seatNumber;
        this.status = status;
        this.seatPrice = seatPrice;
        this.seatType = seatType;
    }
}
