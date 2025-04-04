package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.ServiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceDetailsRepository extends JpaRepository<ServiceDetails, Long> {
}
