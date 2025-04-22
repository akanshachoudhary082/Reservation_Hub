package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;

import java.util.List;

public class ServiceRecordConverterUtils {

    /**
     * Converts a ServiceRecord entity to a ServiceRecordDTO.
     *
     * @param serviceRecord The ServiceRecord entity to convert.
     * @return A ServiceRecordDTO representing the entity.
     */
    public static ServiceRecordDTO convertEntityToDTO(ServiceRecord serviceRecord) {
        return ServiceRecordDTO.builder()
                .serviceRecordId(serviceRecord.getServiceRecordId())
                .serviceType(serviceRecord.getServiceType())
                .details((ServiceDetails) serviceRecord.getDetails())
                .build();
    }

    /**
     * Converts a ServiceRecordDTO to a ServiceRecord entity.
     *
     * @param serviceRecordDTO The ServiceRecordDTO to convert.
     * @return A ServiceRecord entity representing the DTO.
     */
    public static ServiceRecord convertToEntity(ServiceRecordDTO serviceRecordDTO) {
        return ServiceRecord.builder()
                .serviceRecordId(serviceRecordDTO.getServiceRecordId())
                .serviceType(serviceRecordDTO.getServiceType())
                .details((List<ServiceDetails>) serviceRecordDTO.getDetails())
                .build();
    }
}
