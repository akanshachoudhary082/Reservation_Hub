package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Retrieves a list of bookings associated with a specific service detail ID.
 *
 * @param detailId the ID of the related service detail
 * @return a list of Booking entities linked to the given detail ID
 */
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByDetailId(Long detailId);
}
