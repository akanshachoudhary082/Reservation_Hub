package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.EventsDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.EventsAdminConfigurationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventsServiceImpl implements EventsService {

    @Autowired
    private EventsAdminConfigurationRepository eventsAdminConfigurationRepository;

    private static final Logger logger = LoggerFactory.getLogger(EventsServiceImpl.class);

    @Override
    public List<EventsDTO> getEventsByModuleCategory(String moduleCategory) {

        List<AdminConfiguration> events = eventsAdminConfigurationRepository.findByModuleCategory(moduleCategory);
        logger.debug("Retrieved events: {}", events);

        return events.stream()
                .map(event -> {
                    return new EventsDTO(event.getName(), event.getStartPoint() , event.getDescription());
                })
                .collect(Collectors.toList());
    }
}