package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing transport-related {@link Payment} entities.
 * Provides standard CRUD operations by extending {@link JpaRepository}.
 */

@Repository
public  interface TransportPaymentRepository  extends JpaRepository<Payment,Long> {

}
