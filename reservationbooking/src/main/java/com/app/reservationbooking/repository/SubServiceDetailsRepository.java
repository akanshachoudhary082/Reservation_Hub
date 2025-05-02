package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.SubServiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link SubServiceDetails} entities.
 * Inherits basic CRUD operations and pagination/sorting capabilities from {@link JpaRepository}.
 */

@Repository
public interface SubServiceDetailsRepository extends JpaRepository<SubServiceDetails, Long> {

}
