package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.SubServiceDetailsDTO;
import com.app.reservationbooking.entities.SubServiceDetails;
import com.app.reservationbooking.entities.MainServiceRecord;
import java.time.format.DateTimeFormatter;

public class SubServiceDetailsConverterUtils {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    /**
     * Converts a ServiceDetails entity to a ServiceDetailsDTO.
     *
     * @param details The ServiceDetails entity to convert.
     * @return A ServiceDetailsDTO representing the entity, or null if the entity is null.
     */
    public static SubServiceDetailsDTO convertEntityToDTO(SubServiceDetails details) {
        if (details == null) {
            return null;
        }

        return SubServiceDetailsDTO.builder()
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
    public static SubServiceDetails convertToEntity(SubServiceDetailsDTO detailsDTO) {
        if (detailsDTO == null) {
            return null;
        }

        // Here we handle the serviceId field to get the corresponding ServiceRecord
        MainServiceRecord serviceRecord = null;
        if (detailsDTO.getServiceId() != null) {
            serviceRecord = new MainServiceRecord();
            serviceRecord.setServiceRecordId(detailsDTO.getServiceId());  // Assuming serviceId is just an ID
        }

        return SubServiceDetails.builder()
                .detailType(detailsDTO.getDetailType())
                .services(serviceRecord) // Set the ServiceRecord object here
                .build();
    }

}
