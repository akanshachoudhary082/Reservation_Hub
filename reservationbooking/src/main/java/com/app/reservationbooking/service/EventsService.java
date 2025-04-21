package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.EventsDTO;
import java.util.List;

public interface EventsService {
    List<EventsDTO> getEventsByModuleCategory(String moduleCategory);
}
