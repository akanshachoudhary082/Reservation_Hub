package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportSearchDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.TransportSearchRepository;
import com.app.reservationbooking.utility.TransportSearchConverterUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TransportSearchServiceImpl implements TransportSearchService {

    @Autowired
    private TransportSearchRepository transportRepository;

    @Override
    public List<TransportSearchDTO> searchAvailableTransports(TransportSearchDTO requestDTO) {
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

        //TODO - step 1 get module code from configs.getM.. eg BUS
        //TODO - step 2 use below query
        //select * from details d
        //inner join seats s
        //on d.detail_id = s.detail_id
        //where detail_type = 'BUS';

        // Map the found configurations to DTOs and return
        return configs.stream()
                .map(config -> TransportSearchConverterUtils.convertToDTO(config, requestDTO.getSourceCity(), requestDTO.getDestinationCity()))
                .collect(Collectors.toList());
    }
}


