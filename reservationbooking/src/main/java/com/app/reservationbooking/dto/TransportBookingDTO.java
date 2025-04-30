package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.Payment;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.enums.BookingStatus;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TransportBookingDTO {

    private Long bookingId;

    private User user;

    private String passengerName;

    private String mobileNumber;

    private String userEmail;

    private Seat seat;

    private BookingStatus status;

    private LocalDateTime bookingDate;

    private Long detailId;

    private Payment payment;
}
