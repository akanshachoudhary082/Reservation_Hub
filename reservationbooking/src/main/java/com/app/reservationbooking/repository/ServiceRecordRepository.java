package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.enums.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRecordRepository extends JpaRepository<ServiceRecord,Long> {
    List<ServiceRecord> findByServiceType(ServiceType type);
}
