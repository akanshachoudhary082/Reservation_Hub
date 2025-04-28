package com.app.reservationbooking.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "admin_config")
@NoArgsConstructor
@AllArgsConstructor
public class AdminConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_config_seq")
    @SequenceGenerator(name = "admin_config_seq", sequenceName = "admin_id_seq", allocationSize = 1)
    @Column(name = "admin_config_id")
    private Long adminConfigId;

    @Column(name = "detail_id", nullable = false)
    private Long detailId;

    @Column(name = "module_code", nullable = false)
    private String moduleCode;                    // Bus, Train, Flights, Movies, Events

    @Column(name = "module_category", nullable = false)
    private String moduleCategory;                // Timing OR City (For Transport - Timing OR City, For Movies and Events - Timing OR Actual City Name

    @Column(name = "module_name", nullable = false)
    private String name;                 // Name of Transport Service OR Name of Theatre

    @Column(name = "start_point")
    private LocalDateTime startPoint;               // Starting Time (For Movies, Events, Transport) OR Departure City (For Transport, For Movies - null)

    @Column(name = "end_point")
    private LocalDateTime endPoint;               // Ending Time (For Movies, Events, Transport) OR Destination City (For Transport, For Movies - null)

    @Column(name = "description")
    private String description;
    // For Transport: Cities in between
    // For Movies: Description of the movie
    // For Events: Event details

    @Column(name = "price_of_ticket", nullable = false)
    private Double priceOfTicket;

    @Column(name = "available_on", nullable = false)
    private LocalDate availableOn;


}