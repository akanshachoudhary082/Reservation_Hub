package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.TransportSearchDTO;
import com.app.reservationbooking.entities.AdminConfiguration;

public class TransportSearchConverterUtils {

    /**
     * Converts an AdminConfiguration entity to a TransportDTO.
     * If source and destination cities are not provided, they will be extracted from the description.
     *
     * @param config The AdminConfiguration entity to convert.
     * @param sourceCity The source city (optional).
     * @param destinationCity The destination city (optional).
     * @return A TransportDTO representing the entity with populated city fields.
     */

    public static TransportSearchDTO convertToDTO(AdminConfiguration config, String sourceCity, String destinationCity) {
        TransportSearchDTO dto = TransportSearchDTO.builder()
                .id(config.getAdminConfigId())
                .moduleCode(config.getModuleCode())
                .moduleCategory(config.getModuleCategory())
                .name(config.getName())
                .startPoint(config.getStartPoint())
                .endPoint(config.getEndPoint())
                .description(config.getDescription())
                .price(config.getPriceOfTicket())
                .availableOn(config.getAvailableOn())
                .detailId(config.getDetailId())
                .build();

        // Set source and destination cities
        if (sourceCity != null && destinationCity != null) {
            dto.setSourceCity(sourceCity);
            dto.setDestinationCity(destinationCity);
        } else {
            // Extract from description if not provided
            String description = config.getDescription();
            if (description != null && !description.isEmpty()) {
                description = description.replaceAll("(?i)route:", "").trim();
                String[] cities = description.split("\\s*,\\s*");
                if (cities.length >= 2) {
                    dto.setSourceCity(cities[0].trim());
                    dto.setDestinationCity(cities[cities.length - 1].trim());
                }
            }
        }

        return dto;
    }


    /**
     * Converts a TransportDTO to an AdminConfiguration entity.
     * This method sets the entity's description based on the provided source and destination cities in the DTO.
     *
     * @param dto The TransportDTO to convert.
     * @return An AdminConfiguration entity representing the DTO.
     */
    public static AdminConfiguration convertToEntity(TransportSearchDTO dto) {
        AdminConfiguration entity = new AdminConfiguration();
        entity.setAdminConfigId(dto.getId());
        entity.setModuleCode(dto.getModuleCode());
        entity.setModuleCategory(dto.getModuleCategory());
        entity.setName(dto.getName());
        entity.setStartPoint(dto.getStartPoint());
        entity.setEndPoint(dto.getEndPoint());
        entity.setDescription(dto.getDescription());
        entity.setPriceOfTicket(dto.getPrice());
        entity.setAvailableOn(dto.getAvailableOn());


        if (dto.getSourceCity() != null && dto.getDestinationCity() != null) {
            String routeDescription = "Route: " + dto.getSourceCity() + " to " + dto.getDestinationCity();
            entity.setDescription(routeDescription);
        }

        return entity;
    }
}
