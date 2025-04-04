package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceRecord;

public class ServiceRecordConverterUtils {

    public static ServiceRecordDTO convertEntityToDTO(ServiceRecord serviceRecord) {
        return ServiceRecordDTO.builder()
                .serviceRecordId(serviceRecord.getServiceRecordId())
                .serviceType(serviceRecord.getServiceType())
                .user(serviceRecord.getUser())
                .details(serviceRecord.getDetails())
                .build();
    }

    public static ServiceRecord convertToEntity(ServiceRecordDTO serviceRecordDTO) {
        return ServiceRecord.builder()
                .serviceRecordId(serviceRecordDTO.getServiceRecordId())
                .serviceType(serviceRecordDTO.getServiceType())
                .user(serviceRecordDTO.getUser())
                .details(serviceRecordDTO.getDetails())
                .build();
    }
}
