package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportSearchDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.TransportSearchRepository;
import com.app.reservationbooking.utility.TransportSearchConverterUtils;
import jakarta.transaction.Transactional;
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

    /**
     * Searches for available transport configurations matching the given criteria.
     *
     * @param requestDTO contains source city, destination city, available date, and module code
     * @return list of matching TransportSearchDTOs or empty list if no matches
     */
    @Override
    @Transactional
    public List<TransportSearchDTO> searchAvailableTransports(TransportSearchDTO requestDTO) {

        log.info("Searching for available transports with criteria: sourceCity={}, destinationCity={}, availableOn={}, moduleCode={}",
                requestDTO.getSourceCity(), requestDTO.getDestinationCity(), requestDTO.getAvailableOn(), requestDTO.getModuleCode());


        if (requestDTO.getAvailableOn().isBefore(LocalDate.now())) {
            log.warn("The requested availableOn date is in the past: {}", requestDTO.getAvailableOn());
            return List.of();
        }

        List<AdminConfiguration> configs;


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


        if (configs.isEmpty()) {
            log.warn("No transports found for the given search criteria: sourceCity={}, destinationCity={}, availableOn={}, moduleCode={}",
                    requestDTO.getSourceCity(), requestDTO.getDestinationCity(), requestDTO.getAvailableOn(), requestDTO.getModuleCode());
            return List.of();
        }



        return configs.stream()
                .map(config -> TransportSearchConverterUtils.convertToDTO(config, requestDTO.getSourceCity(), requestDTO.getDestinationCity()))
                .collect(Collectors.toList());
    }
}


