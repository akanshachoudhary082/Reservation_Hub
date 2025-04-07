package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.customexception.ResourceNotFoundException;

import java.util.List;

public interface ServiceRecordService {


    List<ServiceRecordDTO> getAllServices();


    ServiceRecordDTO getServiceById(Long serviceRecordId) ;


    ServiceRecordDTO createService(ServiceRecordDTO serviceRecordDTO);


    ServiceRecordDTO updateService(Long serviceRecordId, ServiceRecordDTO serviceRecordDTO) ;

    void deleteService(Long serviceRecordId) ;
}