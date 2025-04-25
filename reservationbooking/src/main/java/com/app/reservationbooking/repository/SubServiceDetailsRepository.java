package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.SubServiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubServiceDetailsRepository extends JpaRepository<SubServiceDetails, Long> {

}
