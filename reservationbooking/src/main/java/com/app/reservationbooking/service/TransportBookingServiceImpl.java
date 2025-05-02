package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.entities.Booking;

import com.app.reservationbooking.entities.Payment;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.BookingRepository;
import com.app.reservationbooking.repository.TransportPaymentRepository;
import com.app.reservationbooking.repository.TransportSeatRepository;
import com.app.reservationbooking.repository.UserRepository;
import com.app.reservationbooking.utility.TransportBookingConverterUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransportBookingServiceImpl implements TransportBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransportSeatRepository seatRepository;

    @Autowired
    private TransportPaymentRepository paymentRepository;



    /**
     * Creates a new booking based on the provided DTO.
     * Validates the presence of mobile number and user existence.
     * Converts DTO to entity, saves bookings, and returns the first as DTO.
     *
     * @param dto TransportBookingDTO containing booking data.
     * @return TransportBookingDTO of the created booking.
     */
    @Override
    @Transactional
    public TransportBookingDTO createBooking(TransportBookingDTO dto) {
        if (dto.getMobileNumber() == null || dto.getMobileNumber().isEmpty()) {
            throw new IllegalArgumentException("Mobile number is required");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Booking> bookings = TransportBookingConverterUtils.convertToEntity(dto, user);

        List<Booking> savedBookings = bookingRepository.saveAll(bookings);

        log.info("Created {} bookings", savedBookings.size());

        return TransportBookingConverterUtils.convertToDTO(savedBookings.get(0));
    }


    /**
     * Retrieves a booking by its ID.
     * Throws an exception if the booking does not exist.
     *
     * @param id Booking ID.
     * @return TransportBookingDTO of the found booking.
     */

    @Override
    public TransportBookingDTO getBookingById(Long id) {
        Booking entity = bookingRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Booking not found with ID: {}", id);
                    return new ResourceNotFoundException("Booking not found with id: " + id);
                });
        return TransportBookingConverterUtils.convertToDTO(entity);
    }
    /**
     * Retrieves all bookings from the database.
     *
     * @return List of TransportBookingDTO for all bookings.
     */

    @Override
    public List<TransportBookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        log.info("Retrieved {} bookings", bookings.size());
        return bookings.stream()
                .map(TransportBookingConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }


    /**
     * Updates existing bookings based on the provided detail ID and DTO.
     * Ensures that existing bookings are found, updates them using DTO data,
     * and saves the updated entities.
     *
     * @param id  Booking ID (not directly used but part of API design).
     * @param dto DTO containing updated data.
     * @return TransportBookingDTO of the updated booking.
     */
    @Override
    @Transactional
    public TransportBookingDTO updateBooking(Long id, TransportBookingDTO dto) {
        List<Booking> existingBookings = bookingRepository.findByDetailId(dto.getDetailId());
        if (existingBookings.isEmpty()) {
            log.error("Cannot update. No bookings found with detail ID: {}", dto.getDetailId());
            throw new ResourceNotFoundException("No bookings found with detail ID: " + dto.getDetailId());
        }

        User user = existingBookings.get(0).getUser();
        if (user == null) {
            throw new IllegalStateException("User info is missing in the existing booking.");
        }

        List<Booking> updatedBookings = TransportBookingConverterUtils.convertToEntity(dto, user);

        // Set existing booking IDs to ensure updates
        for (int i = 0; i < existingBookings.size() && i < updatedBookings.size(); i++) {
            updatedBookings.get(i).setBookingId(existingBookings.get(i).getBookingId());
        }

        List<Booking> savedBookings = bookingRepository.saveAll(updatedBookings);
        log.info("Updated {} bookings", savedBookings.size());

        return TransportBookingConverterUtils.convertToDTO(savedBookings.get(0));
    }

    /**
     * Deletes a booking by its ID.
     * Throws an exception if the booking does not exist.
     *
     * @param id Booking ID to be deleted.
     */

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            log.error("Cannot delete. Booking not found with ID: {}", id);
            throw new ResourceNotFoundException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
        log.info("Booking deleted with ID: {}", id);
    }
}
