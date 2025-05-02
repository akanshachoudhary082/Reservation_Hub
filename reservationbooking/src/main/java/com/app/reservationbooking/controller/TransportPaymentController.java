package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.TransportPaymentDTO;
import com.app.reservationbooking.service.TransportPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RestController
@RequestMapping("/transport-payments")
public class TransportPaymentController {

    @Autowired
    private TransportPaymentService transportPaymentService;

    /**
     * Creates a new transport payment record.
     *
     * @param transportPaymentDTO the payment details to be recorded
     * @return the created transport payment record
     */
    @PostMapping
    public TransportPaymentDTO createTransportPayment(@RequestBody TransportPaymentDTO transportPaymentDTO) {
        return transportPaymentService.createPayment(transportPaymentDTO);
    }
}
