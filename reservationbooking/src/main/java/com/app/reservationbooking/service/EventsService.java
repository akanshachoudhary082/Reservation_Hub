package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.EventSeatDTO;
import com.app.reservationbooking.dto.EventsDTO;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Service interface for managing events and their associated seats.
 */
public interface EventsService {

    /**
     * Retrieves a list of events based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of EventsDTO objects that belong to the specified module category
     */
    List<EventsDTO> getEventsByModuleCategory(String moduleCategory);

    /**
     * Retrieves a list of available event seats based on the specified city, event description, theater name, and show date/time.
     *
     * @param city the city where the theater is located
     * @param description the name of the event for which to retrieve seats
     * @param theaterName the name of the theater
     * @param datetime the date and time of the event
     * @return a list of EventSeatDTO objects representing the available seats for the specified event and showtime
     */
    List<EventSeatDTO> getEventSeatsByDescriptionAndCityAndDateTime(String city, String description, String theaterName, LocalDateTime datetime);
}