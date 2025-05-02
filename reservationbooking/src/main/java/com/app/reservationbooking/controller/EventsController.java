package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.EventSeatDTO;
import com.app.reservationbooking.dto.EventsDTO;
import com.app.reservationbooking.service.EventsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/events")
public class EventsController {

    private static final Logger logger = LoggerFactory.getLogger(EventsController.class);

    @Autowired
    private EventsService eventsService;

    /**
     * Retrieves a list of events available in a specific city.
     *
     * @param city the city for which to retrieve events
     * @return a ResponseEntity containing a list of EventsDTO objects
     */
    @GetMapping("/get-events/{city}")
    public ResponseEntity<List<EventsDTO>> getEventsByCity(@PathVariable String city) {
        logger.info("Fetching events for city: {}", city);
        List<EventsDTO> events = eventsService.getEventsByModuleCategory(city);
        return ResponseEntity.ok(events);
    }

    /**
     * Retrieves available seats for a specific event at a given theater and time.
     *
     * @param city the city where the theater is located
     * @param description the name of the event
     * @param theaterName the name of the theater
     * @param datetime the date and time of the event
     * @return a ResponseEntity containing a list of EventSeatDTO objects
     */
    @GetMapping("/get-seats/{city}/{description}/{theaterName}/{datetime}")
    public ResponseEntity<List<EventSeatDTO>> getEventSeats(@PathVariable String city, @PathVariable String description, @PathVariable String theaterName, @PathVariable LocalDateTime datetime) {
        logger.info("Fetching seats for city: {}, event: {}, venue: {}, dateTime: {}", city, description, theaterName, datetime);
        List<EventSeatDTO> eventSeats = eventsService.getEventSeatsByDescriptionAndCityAndDateTime(city, description, theaterName, datetime);
        return ResponseEntity.ok(eventSeats);
    }
}