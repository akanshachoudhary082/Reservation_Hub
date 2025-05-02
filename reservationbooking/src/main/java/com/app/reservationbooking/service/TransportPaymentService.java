package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportPaymentDTO;

/**
 * Service interface for managing transport-related payment operations.
 * Provides methods for creating payment records.
 */
public interface TransportPaymentService  {

    /**
     * Creates a new transport payment record.
     *
     * @param transportPaymentDTO the data transfer object containing payment details
     * @return the created {@link TransportPaymentDTO} representing the saved payment
     */
    TransportPaymentDTO createPayment(TransportPaymentDTO transportPaymentDTO);
}
