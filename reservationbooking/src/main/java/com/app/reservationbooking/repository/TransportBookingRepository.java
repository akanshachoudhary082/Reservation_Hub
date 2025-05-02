package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing transport-related {@link Booking} entities.
 * Inherits standard CRUD operations from {@link JpaRepository}.
 */

public interface TransportBookingRepository  extends JpaRepository<Booking, Long> {
}
