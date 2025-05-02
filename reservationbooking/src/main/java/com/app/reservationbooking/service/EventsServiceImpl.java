package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.EventSeatDTO;
import com.app.reservationbooking.dto.EventsDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.repository.EventSeatRepository;
import com.app.reservationbooking.repository.EventsAdminConfigurationRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the EventsService interface for managing events and their associated seats.
 */
@Service
public class EventsServiceImpl implements EventsService {

    @Autowired
    private EventsAdminConfigurationRepository eventsAdminConfigurationRepository;

    @Autowired
    private EventSeatRepository eventSeatRepository;

    private static final Logger logger = LoggerFactory.getLogger(EventsServiceImpl.class);

    /**
     * Retrieves a list of events based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of EventsDTO objects that belong to the specified module category
     */
    @Override

    public List<EventsDTO> getEventsByModuleCategory(String moduleCategory) {
        logger.info("Fetching events for module category: {}", moduleCategory);

        List<AdminConfiguration> events = eventsAdminConfigurationRepository.findByModuleCategory(moduleCategory);
        logger.debug("Retrieved events: {}", events);

        return events.stream()
                .map(event -> new EventsDTO(event.getName(), event.getStartPoint(), event.getDescription()))
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of available event seats based on the specified city, event description, theater name, and show date/time.
     *
     * @param city the city where the theater is located
     * @param showName the description of the event for which to retrieve seats
     * @param theaterName the name of the theater
     * @param showDateTime the date and time of the event
     * @return a list of EventSeatDTO objects representing the available seats for the specified event and showtime
     */
    @Override
    @Transactional
    public List<EventSeatDTO> getEventSeatsByDescriptionAndCityAndDateTime(String city, String showName, String theaterName, LocalDateTime showDateTime) {
        logger.info("Fetching available seats for city: {}, event: {}, theater: {}, dateTime: {}", city, showName, theaterName, showDateTime);

        List<Seat> eventSeats = eventSeatRepository.findByCityAndDescriptionAndTheatreNameAndDateTime(city, showName, theaterName, showDateTime);
        logger.debug("Retrieved event seats: {}", eventSeats.size());

        return eventSeats.stream()
                .map(eventSeat -> {
                    logger.debug("Event Price of Ticket: {}, Event Seat Type: {}", eventSeat.getSeatPrice(), eventSeat.getSeatType());
                    return new EventSeatDTO(eventSeat.getSeatNumber(), eventSeat.getStatus(), eventSeat.getSeatPrice(), eventSeat.getSeatType());
                })
                .collect(Collectors.toList());
    }
}