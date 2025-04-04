package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking,Long> {

}
