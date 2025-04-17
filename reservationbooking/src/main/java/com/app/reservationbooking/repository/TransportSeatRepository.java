package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportSeatRepository extends JpaRepository<Seat, Long> {

    // Custom query to find seats by ServiceDetails (detailId)
    List<Seat> findByServiceDetailsDetailId(Long detailId);
}
