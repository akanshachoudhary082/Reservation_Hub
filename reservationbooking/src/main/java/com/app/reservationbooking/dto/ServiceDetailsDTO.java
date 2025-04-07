package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.enums.ServiceDetailType;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ServiceDetailsDTO extends BaseEntity {

    private Long detailId;
    
    private ServiceDetailType detailType;

    private String source;

    private String destination;

    private String departureTime;

    private String arrivalTime;

    private String venue;

    private Long serviceId;

}
