package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.EventsDTO;
import com.app.reservationbooking.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/events")
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping("/get-events/{city}")
    public ResponseEntity<List<EventsDTO>> getEventsByCity(@PathVariable String city) {
        System.out.println(city);
        List<EventsDTO> events = eventsService.getEventsByModuleCategory(city);
        return ResponseEntity.ok(events);
    }
}
