package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.ServiceDetailsDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ServiceDetailsConverterUtils {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    public static ServiceDetailsDTO convertEntityToDTO(ServiceDetails details) {
        if (details == null) {
            return null;
        }

        return ServiceDetailsDTO.builder()
                .detailId(details.getDetailId())
                .detailType(details.getDetailType())
                .source(details.getSource())
                .destination(details.getDestination())
                .departureTime(formatDate(details.getDepartureTime()))
                .arrivalTime(formatDate(details.getArrivalTime()))
                .venue(details.getVenue())
                .serviceId(details.getServices() != null ? details.getServices().getServiceRecordId() : null) // Ensure serviceId is set
                .build();
    }

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
                .source(detailsDTO.getSource())
                .destination(detailsDTO.getDestination())
                .departureTime(parseDate(detailsDTO.getDepartureTime()))
                .arrivalTime(parseDate(detailsDTO.getArrivalTime()))
                .venue(detailsDTO.getVenue())
                .services(serviceRecord) // Set the ServiceRecord object here
                .build();
    }

    private static String formatDate(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(formatter) : null;
    }

    private static LocalDateTime parseDate(String dateStr) {
        return (dateStr != null && !dateStr.isEmpty()) ? LocalDateTime.parse(dateStr, formatter) : null;
    }
}
