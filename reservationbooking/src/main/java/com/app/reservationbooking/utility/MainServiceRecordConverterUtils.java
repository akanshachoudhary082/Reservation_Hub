package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.MainServiceRecordDTO;
import com.app.reservationbooking.entities.SubServiceDetails;
import com.app.reservationbooking.entities.MainServiceRecord;

import java.util.List;

public class MainServiceRecordConverterUtils {

    /**
     * Converts a ServiceRecord entity to a ServiceRecordDTO.
     *
     * @param serviceRecord The ServiceRecord entity to convert.
     * @return A ServiceRecordDTO representing the entity.
     */
    public static MainServiceRecordDTO convertEntityToDTO(MainServiceRecord serviceRecord) {
        return MainServiceRecordDTO.builder()
                .serviceRecordId(serviceRecord.getServiceRecordId())
                .serviceType(serviceRecord.getServiceType())
                .details((SubServiceDetails) serviceRecord.getDetails())
                .build();
    }

    /**
     * Converts a ServiceRecordDTO to a ServiceRecord entity.
     *
     * @param serviceRecordDTO The ServiceRecordDTO to convert.
     * @return A ServiceRecord entity representing the DTO.
     */
    public static MainServiceRecord convertToEntity(MainServiceRecordDTO serviceRecordDTO) {
        return MainServiceRecord.builder()
                .serviceRecordId(serviceRecordDTO.getServiceRecordId())
                .serviceType(serviceRecordDTO.getServiceType())
                .details((List<SubServiceDetails>) serviceRecordDTO.getDetails())
                .build();
    }
}
