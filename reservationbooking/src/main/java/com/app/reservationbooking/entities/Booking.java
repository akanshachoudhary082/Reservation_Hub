package com.app.reservationbooking.entities;

import java.time.LocalDateTime;
import com.app.reservationbooking.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Booking extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookings_seq")
    @SequenceGenerator(name = "bookings_seq", sequenceName = "bookings_booking_id_seq", allocationSize = 1)
    @Column(name = "booking_id", nullable = false)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "passenger_name", nullable = false)
    private String passengerName;


    @Column(name = "mobile_number", unique = true, nullable = false)
    private String mobileNumber;

    @Column(name = "email", unique = true, nullable = false)
    private String userEmail;

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BookingStatus status;
    
    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;


    @Column(name = "detail_id", nullable = false)
    private Long detailId;

    @OneToOne
    @JoinColumn(name = "payment_id", nullable = true)
    private Payment payment;


}