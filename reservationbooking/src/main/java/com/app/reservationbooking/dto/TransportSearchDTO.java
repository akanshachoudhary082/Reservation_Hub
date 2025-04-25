package com.app.reservationbooking.dto;


import com.app.reservationbooking.entities.BaseEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TransportSearchDTO extends BaseEntity {

    private Long id;

    private String moduleCode; // e.g., Bus, Train, Flight

    private String moduleCategory;// e.g., Timing, City

    private String name;        // Name of the transport service

    private LocalDateTime startPoint;

    private LocalDateTime endPoint;

    private String description;

    private double price;

    private LocalDate availableOn;

    private String sourceCity;

    private String destinationCity;

    private Long detailId;


}