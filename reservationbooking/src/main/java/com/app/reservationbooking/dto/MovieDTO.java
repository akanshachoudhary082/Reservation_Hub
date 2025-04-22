package com.app.reservationbooking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MovieDTO {

    private LocalDateTime startPoint;

    private String description;

    private String name;

    public MovieDTO(LocalDateTime startPoint,String description, String name) {
        this.startPoint = startPoint;
        this.description = description;
        this.name = name;
    }

}