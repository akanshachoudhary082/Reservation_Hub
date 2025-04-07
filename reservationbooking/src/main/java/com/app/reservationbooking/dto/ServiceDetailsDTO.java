package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.enums.ServiceDetailType;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ServiceDetailsDTO extends BaseEntity {

    private Long detailId;
    
    private ServiceDetailType detailType;

    private Long serviceId;

}
