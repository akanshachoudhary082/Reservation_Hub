package com.app.reservationbooking.dto;

import com.app.reservationbooking.enums.ServiceType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceRecordDTO {
    private Long serviceId;
    private ServiceType serviceType;
    private Long userId;
    private Long detailsId;
}
