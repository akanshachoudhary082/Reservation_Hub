package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing transport-related {@link Seat} entities.
 * Provides standard CRUD operations via {@link JpaRepository} and custom queries.
 */

@Repository
public interface TransportSeatRepository extends JpaRepository<Seat, Long> {
    // You can add custom queries here if needed
    /**
     * Retrieves a list of seats associated with a specific service detail ID.
     *
     * @param detailId the ID of the related service detail (e.g., transport or trip)
     * @return a list of {@link Seat} entities linked to the given detail ID
     */
    List<Seat> findByDetailId(Long detailId);
}
