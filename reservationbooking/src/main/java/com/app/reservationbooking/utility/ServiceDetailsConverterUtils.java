package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.ServiceDetailsDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;
import java.time.format.DateTimeFormatter;

public class ServiceDetailsConverterUtils {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    /**
     * Converts a ServiceDetails entity to a ServiceDetailsDTO.
     *
     * @param details The ServiceDetails entity to convert.
     * @return A ServiceDetailsDTO representing the entity, or null if the entity is null.
     */
    public static ServiceDetailsDTO convertEntityToDTO(ServiceDetails details) {
        if (details == null) {
            return null;
        }

        return ServiceDetailsDTO.builder()
                .detailId(details.getDetailId())
                .detailType(details.getDetailType())
                .serviceId(details.getServices() != null ? details.getServices().getServiceRecordId() : null) // Ensure serviceId is set
                .build();
    }

    /**
     * Converts a ServiceDetailsDTO to a ServiceDetails entity.
     *
     * @param detailsDTO The ServiceDetailsDTO to convert.
     * @return A ServiceDetails entity representing the DTO, or null if the DTO is null.
     */
    public static ServiceDetails convertToEntity(ServiceDetailsDTO detailsDTO) {
        if (detailsDTO == null) {
            return null;
        }

        // Here we handle the serviceId field to get the corresponding ServiceRecord
        ServiceRecord serviceRecord = null;
        if (detailsDTO.getServiceId() != null) {
            serviceRecord = new ServiceRecord();
            serviceRecord.setServiceRecordId(detailsDTO.getServiceId());  // Assuming serviceId is just an ID
        }

        return ServiceDetails.builder()
                .detailType(detailsDTO.getDetailType())
                .services(serviceRecord) // Set the ServiceRecord object here
                .build();
    }

}
