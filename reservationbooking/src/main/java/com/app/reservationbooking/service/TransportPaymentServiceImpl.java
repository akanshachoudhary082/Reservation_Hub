package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.TransportPaymentDTO;
import com.app.reservationbooking.entities.MainServiceRecord;
import com.app.reservationbooking.entities.Payment;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.MainServiceRecordRepository;
import com.app.reservationbooking.repository.TransportPaymentRepository;
import com.app.reservationbooking.repository.UserRepository;
import com.app.reservationbooking.utility.TransportPaymentConverterUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for handling transport payment operations.
 */
@Service
@Slf4j
public class TransportPaymentServiceImpl implements TransportPaymentService {

    @Autowired
    private TransportPaymentRepository transportPaymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MainServiceRecordRepository mainServiceRecordRepository;

    /**
     * Creates a new payment entry in the system.
     * Steps:
     * - Converts DTO to Payment entity
     * - Fetches associated User and Service
     * - Saves Payment to the repository
     * - Converts the saved entity back to DTO
     *
     * @param dto TransportPaymentDTO containing payment details
     * @return TransportPaymentDTO of the saved payment
     */
    @Override
    @Transactional
    public TransportPaymentDTO createPayment(TransportPaymentDTO dto) {
        log.info("Initiating payment creation process for userId: {}", dto.getUserId());


        Payment payment = TransportPaymentConverterUtils.convertToEntity(dto);
        log.debug("Converted DTO to Payment entity: {}", payment);

        try {

            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
            payment.setUser(user);
            log.info("Fetched user with id: {}", dto.getUserId());

            MainServiceRecord service = mainServiceRecordRepository.findById(dto.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found with id: " + dto.getServiceId()));
            payment.setServices(service);
            log.info("Fetched service with id: {}", dto.getServiceId());


            Payment saved = transportPaymentRepository.save(payment);
            log.info("Payment saved successfully with id: {}", saved.getPaymentId());


            TransportPaymentDTO responseDTO = TransportPaymentConverterUtils.convertToDTO(saved);
            log.debug("Converted saved Payment entity back to DTO: {}", responseDTO);

            return responseDTO;
        } catch (RuntimeException e) {
            log.error("Error occurred while processing payment: {}", e.getMessage());
            throw e;
        }
    }
}
