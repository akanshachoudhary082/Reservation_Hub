package com.app.reservationbooking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class EventsDTO {

    private String name;

    private LocalDateTime startPoint;

    private String description;

    public EventsDTO(String name, LocalDateTime startPoint, String description) {
        this.name = name;
        this.startPoint = startPoint;
        this.description = description;
    }

}
