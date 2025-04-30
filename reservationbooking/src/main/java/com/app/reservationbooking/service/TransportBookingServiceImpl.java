package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.TransportBookingDTO;
import com.app.reservationbooking.entities.Booking;

import com.app.reservationbooking.repository.BookingRepository;
import com.app.reservationbooking.utility.TransportBookingConverterUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransportBookingServiceImpl implements TransportBookingService {

    private final BookingRepository bookingRepository;

    @Override
    public TransportBookingDTO createBooking(TransportBookingDTO dto) {
        Booking entity = TransportBookingConverterUtils.convertToEntity(dto);
        Booking saved = bookingRepository.save(entity);
        log.info("Booking created with ID: {}", saved.getBookingId());
        return TransportBookingConverterUtils.convertToDTO(saved);
    }

    @Override
    public TransportBookingDTO getBookingById(Long id) {
        Booking entity = bookingRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Booking not found with ID: {}", id);
                    return new ResourceNotFoundException("Booking not found with id: " + id);
                });
        return TransportBookingConverterUtils.convertToDTO(entity);
    }

    @Override
    public List<TransportBookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        log.info("Retrieved {} bookings", bookings.size());
        return bookings.stream()
                .map(TransportBookingConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransportBookingDTO updateBooking(Long id, TransportBookingDTO dto) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Cannot update. Booking not found with ID: {}", id);
                    return new ResourceNotFoundException("Booking not found with id: " + id);
                });

        Booking updated = TransportBookingConverterUtils.convertToEntity(dto);
        updated.setBookingId(existing.getBookingId());

        Booking saved = bookingRepository.save(updated);
        log.info("Booking updated with ID: {}", saved.getBookingId());
        return TransportBookingConverterUtils.convertToDTO(saved);
    }

    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            log.error("Cannot delete. Booking not found with ID: {}", id);
            throw new ResourceNotFoundException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
        log.info("Booking deleted with ID: {}", id);
    }
}
