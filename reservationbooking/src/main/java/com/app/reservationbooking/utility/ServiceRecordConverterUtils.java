package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;

import java.util.List;

public class ServiceRecordConverterUtils {

    public static ServiceRecordDTO convertEntityToDTO(ServiceRecord serviceRecord) {
        return ServiceRecordDTO.builder()
                .serviceRecordId(serviceRecord.getServiceRecordId())
                .serviceType(serviceRecord.getServiceType())
//                .user(serviceRecord.getUser())
                .details((ServiceDetails) serviceRecord.getDetails())
                .build();
    }

    public static ServiceRecord convertToEntity(ServiceRecordDTO serviceRecordDTO) {
        return ServiceRecord.builder()
                .serviceRecordId(serviceRecordDTO.getServiceRecordId())
                .serviceType(serviceRecordDTO.getServiceType())
                //.user(serviceRecordDTO.getUser())
                .details((List<ServiceDetails>) serviceRecordDTO.getDetails())
                .build();
    }
}

