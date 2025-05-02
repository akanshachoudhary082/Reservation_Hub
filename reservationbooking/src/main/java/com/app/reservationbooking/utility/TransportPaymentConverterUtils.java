package com.app.reservationbooking.utility;

import com.app.reservationbooking.dto.TransportPaymentDTO;
import com.app.reservationbooking.entities.Payment;

/**
 * Utility class that provides methods for converting between TransportPaymentDTO and Payment entity.
 * These methods ensure proper transformation between DTOs used for API communication and entities used in the database.
 */

public class TransportPaymentConverterUtils {

    // Convert DTO to Entity
    /**
     * Converts a TransportPaymentDTO to a Payment entity.
     *
     * @param dto the TransportPaymentDTO to convert
     * @return the Payment entity representing the DTO
     */
    public static Payment convertToEntity(TransportPaymentDTO dto) {
        Payment payment = new Payment();

        // Set properties from DTO to Entity
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(dto.getPaymentStatus());
        return payment;
    }

    // Convert Entity to DTO
    /**
     * Converts a Payment entity to a TransportPaymentDTO.
     *
     * @param payment the Payment entity to convert
     * @return the TransportPaymentDTO representing the Payment entity
     */
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
