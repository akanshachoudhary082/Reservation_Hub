package com.app.reservationbooking.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "admin_config")
@AllArgsConstructor
public class AdminConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_config_seq")
    @SequenceGenerator(name = "admin_config_seq", sequenceName = "admin_id_seq", allocationSize = 1)
    @Column(name = "admin_config_id")
    private long adminConfigId;

    @Column(name = "module_code", nullable = false)
    private String moduleCode;                    // Bus, Train, Flights, Movies, Events

    @Column(name = "module_category", nullable = false)
    private String moduleCategory;                // Timing OR City (For Transport - Timing OR City, For Movies and Events - Timing OR Actual City Name

    @Column(name = "module_name", nullable = false)
    private String name;                 // Name of Transport Service OR Name of Theatre

    @Column(name = "config_1")
    private String config1;              // Starting Time (For Movies, Events, Transport) OR Departure City (For Transport, For Movies - null)

    @Column(name = "config_2")
    private String config2;              // Ending Time (For Movies, Events, Transport) OR Destination City (For Transport, For Movies - null)

    @Column(name = "config_3")
    private String config3;              // For Transport - Cities between Departure and Destination OR For Movies - Description of Movies

    @Column(name = "price_of_ticket", nullable = false)
    private double priceOfTicket;
}
