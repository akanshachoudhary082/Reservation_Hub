package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportBookingRepository  extends JpaRepository<Booking, Long> {
}
