package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.ServiceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRecordRepository extends JpaRepository<ServiceRecord,Long> {
}
