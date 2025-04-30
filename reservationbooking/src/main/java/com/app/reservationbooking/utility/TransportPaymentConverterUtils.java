package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.TransportPaymentDTO;
import com.app.reservationbooking.entities.Payment;

public class TransportPaymentConverterUtils {

    // Convert DTO to Entity
    public static Payment convertToEntity(TransportPaymentDTO dto) {
        Payment payment = new Payment();

        // Set properties from DTO to Entity
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(dto.getPaymentStatus());

        // Note: We won't set 'user' and 'service' here as they are fetched separately in the service layer
        return payment;
    }

    // Convert Entity to DTO
    public static TransportPaymentDTO convertToDTO(Payment payment) {
        TransportPaymentDTO dto = new TransportPaymentDTO();

        // Set properties from Entity to DTO
        dto.setPaymentId(payment.getPaymentId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setUserId(payment.getUser() != null ? payment.getUser().getUserId() : null); // Ensure we don't get a null pointer
        dto.setServiceId(payment.getServices() != null ? payment.getServices().getServiceRecordId() : null); // Ensure we don't get a null pointer

        return dto;
    }
}
