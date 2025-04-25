package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportSeatRepository extends JpaRepository<Seat, Long> {
    // You can add custom queries here if needed
    List<Seat> findByDetailId(Long detailId);
}
