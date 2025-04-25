package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.enums.SubServiceDetailType;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SubServiceDetailsDTO extends BaseEntity {

    private Long detailId;
    
    private SubServiceDetailType detailType;

    private Long serviceId;

}
