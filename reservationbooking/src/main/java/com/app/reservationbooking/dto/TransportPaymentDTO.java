package com.app.reservationbooking.dto;


import com.app.reservationbooking.enums.PaymentMethod;
import com.app.reservationbooking.enums.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TransportPaymentDTO {

    private Long paymentId;

    private Long serviceId;

    private Long userId;

    private Double amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private String transactionId;

    private LocalDateTime paymentDate;


}
