package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.TransportRepository;
import com.app.reservationbooking.utility.TransportConverterUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TransportServiceImpl implements TransportService {

    @Autowired
    private TransportRepository transportRepository;

    @Override
    public List<TransportDTO> searchAvailableTransports(TransportDTO requestDTO) {
        // Log the incoming search criteria
        log.info("Searching for available transports with criteria: sourceCity={}, destinationCity={}, availableOn={}, moduleCode={}",
                requestDTO.getSourceCity(), requestDTO.getDestinationCity(), requestDTO.getAvailableOn(), requestDTO.getModuleCode());

        // Check if the availableOn date is in the past
        if (requestDTO.getAvailableOn().isBefore(LocalDate.now())) {
            log.warn("The requested availableOn date is in the past: {}", requestDTO.getAvailableOn());
            return List.of(); // Return an empty list if the date is invalid
        }

        List<AdminConfiguration> configs;

        // If both source and destination cities are provided, search with those criteria
        if (requestDTO.getSourceCity() != null && requestDTO.getDestinationCity() != null) {
            log.info("Fetching transport configurations for route from {} to {}", requestDTO.getSourceCity(), requestDTO.getDestinationCity());
            configs = transportRepository.findByAvailableOnAndModuleCodeAndRoute(
                    requestDTO.getAvailableOn(),
                    requestDTO.getModuleCode(),
                    requestDTO.getSourceCity(),
                    requestDTO.getDestinationCity()
            );
        } else {
            log.info("Fetching transport configurations for module code: {}", requestDTO.getModuleCode());
            configs = transportRepository.findByAvailableOnAndModuleCode(
                    requestDTO.getAvailableOn(),
                    requestDTO.getModuleCode()
            );
        }

        // Check if no results were found
        if (configs.isEmpty()) {
            log.warn("No transports found for the given search criteria: sourceCity={}, destinationCity={}, availableOn={}, moduleCode={}",
                    requestDTO.getSourceCity(), requestDTO.getDestinationCity(), requestDTO.getAvailableOn(), requestDTO.getModuleCode());
            return List.of(); // Return empty list if no transports are found
        }

        // Map the found configurations to DTOs and return
        return configs.stream()
                .map(config -> TransportConverterUtils.convertToDTO(config, requestDTO.getSourceCity(), requestDTO.getDestinationCity()))
                .collect(Collectors.toList());
    }
}
