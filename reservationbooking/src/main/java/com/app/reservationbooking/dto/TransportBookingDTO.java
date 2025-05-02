package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.Payment;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.enums.BookingStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TransportBookingDTO {

    private Long bookingId;

    //private User user;

    private Long userId;


    private String passengerName;

    private String mobileNumber;

    private String userEmail;

   // private Seat seat;
   private List<TransportSeatDTO> seats;


    private BookingStatus status;

    private LocalDateTime bookingDate;

    private String stateResidency;

    private Long detailId;

    private Payment payment;
}
