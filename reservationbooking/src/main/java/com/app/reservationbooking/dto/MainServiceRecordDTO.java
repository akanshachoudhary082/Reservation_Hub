package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.entities.SubServiceDetails;
import com.app.reservationbooking.enums.MainServiceType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MainServiceRecordDTO extends BaseEntity {

    private Long serviceRecordId;


    private MainServiceType serviceType;


    private SubServiceDetails details;
}