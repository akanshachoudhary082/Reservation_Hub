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

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BookingStatus status;
    
    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @Column(name = "start_point", nullable = false)
    private LocalDateTime startPoint;               // Starting Time (For Movies, Events, Transport) OR Departure City (For Transport, For Movies - null)

    @Column(name = "end_point",nullable = false)
    private LocalDateTime endPoint;



//    @Column(name = "time_slot", nullable = false)
//    private String timeSlot;

//    @ManyToOne
//    @JoinColumn(name = "detail_id", nullable = false)
//    private ServiceDetails details;

     @Column(name = "detail_id", nullable = false)
      private Long detailId;

    @OneToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;
}