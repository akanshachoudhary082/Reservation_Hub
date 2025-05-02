package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.repository.TransportSeatRepository;
import com.app.reservationbooking.utility.TransportSeatConverterUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransportSeatServiceImpl implements TransportSeatService {

    @Autowired
    private  TransportSeatRepository transportSeatRepository; // Injecting the repository

    /**
     * Retrieves a list of transport seats associated with a specific service detail ID.
     *
     * @param detailId the ID of the related service detail (e.g., transport trip)
     * @return a list of {@link TransportSeatDTO} objects for the specified detail ID
     */
    @Override
    public List<TransportSeatDTO> getSeatsByDetailId(Long detailId) {
        log.info("Fetching all seats for AdminConfig ID: {}", detailId);
        return transportSeatRepository.findByDetailId(detailId)
                .stream()
                .map(TransportSeatConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of all transport seats.
     *
     * @return a list of all {@link TransportSeatDTO} objects
     */

    @Override
    public List<TransportSeatDTO> getAllSeats() {
        log.info("Fetching all seats");
        return transportSeatRepository.findAll()
                .stream()
                .map(TransportSeatConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Creates a new transport seat.
     *
     * @param dto the data transfer object containing the seat details
     * @return the {@link TransportSeatDTO} object representing the newly created seat
     */
    @Override
    @Transactional
    public TransportSeatDTO createSeat(TransportSeatDTO dto) {
        log.info("Creating seat: {}", dto);
        Seat seat = TransportSeatConverterUtils.convertToEntity(dto);
        return TransportSeatConverterUtils.convertToDTO(transportSeatRepository.save(seat));
    }

    /**
     * Updates an existing transport seat.
     *
     * @param seatId the ID of the seat to be updated
     * @param dto the updated seat details
     * @return the {@link TransportSeatDTO} object representing the updated seat
     * @throws ResourceNotFoundException if the seat with the specified ID is not found
     */

    @Override
    @Transactional
    public TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO dto) {
        log.info("Updating seat with ID: {}", seatId);
        Seat existingSeat = transportSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + seatId));

        existingSeat.setSeatNumber(String.valueOf(dto.getSeatNumber()));
        existingSeat.setSeatType(dto.getSeatType());
        existingSeat.setClassType(dto.getClassType());
        existingSeat.setStatus(dto.getStatus());

        return TransportSeatConverterUtils.convertToDTO(transportSeatRepository.save(existingSeat));
    }

    /**
     * Deletes a transport seat by its ID.
     *
     * @param seatId the ID of the seat to be deleted
     * @throws ResourceNotFoundException if the seat with the specified ID is not found
     */
    @Override
    @Transactional
    public void deleteSeat(Long seatId) {
        log.info("Deleting seat with ID: {}", seatId);
        Seat seat = transportSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + seatId));
        transportSeatRepository.delete(seat);
    }
}
