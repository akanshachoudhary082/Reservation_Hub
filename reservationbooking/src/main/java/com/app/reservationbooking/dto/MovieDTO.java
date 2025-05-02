package com.app.reservationbooking.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Movie information.
 */
@Getter
@NoArgsConstructor
public class MovieDTO {

    private LocalDateTime startPoint; // The start time of the movie

    private String description; // The Name of the movie

    private String name; // The Theatre name for the movie

    /**
     * Constructor to create a MovieDTO with specified start point, description, and name.
     *
     * @param startPoint the start time of the movie
     * @param description a name of the movie
     * @param name the theatre name for the movie
     */
    public MovieDTO(LocalDateTime startPoint, String description, String name) {
        this.startPoint = startPoint;
        this.description = description;
        this.name = name;
    }
}