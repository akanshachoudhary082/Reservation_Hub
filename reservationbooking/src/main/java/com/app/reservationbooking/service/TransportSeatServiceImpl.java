//package com.app.reservationbooking.service;
//
//import com.app.reservationbooking.dto.TransportSeatDTO;
//import com.app.reservationbooking.entities.Seat;
//import com.app.reservationbooking.enums.ClassType;
//import com.app.reservationbooking.enums.SeatStatus;
//import com.app.reservationbooking.enums.SeatType;
//import com.app.reservationbooking.repository.TransportSeatRepository;
//import com.app.reservationbooking.utility.TransportSeatUtils;
//import com.app.reservationbooking.customexception.ResourceNotFoundException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Slf4j
///**
// * Service implementation for handling operations related to transport seats.
// */
//@Service
//public class TransportSeatServiceImpl implements TransportSeatService {
//
//    @Autowired
//    private TransportSeatRepository transportSeatRepository;
//
//    /**
//     * Retrieves the available seats for a given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return List of available TransportSeatDTO objects.
//     * @throws ResourceNotFoundException if no seats are found for the service detail ID.
//     */
//    @Override
//    public List<TransportSeatDTO> getSeatsByServiceDetailId(Long detailId) {
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        if (seats.isEmpty()) {
//            log.warn("No seats found for service detail ID: {}", detailId);
//            throw new ResourceNotFoundException("No seats found for service detail ID: " + detailId);
//        }
//
//        // Filter only available seats
//        List<Seat> availableSeats = seats.stream()
//                .filter(seat -> SeatStatus.AVAILABLE == seat.getStatus()) // Only available seats
//                .collect(Collectors.toList());
//
//        log.info("Found {} available seats for service detail ID: {}", availableSeats.size(), detailId);
//
//        // Convert the available seats to DTO and return
//        return availableSeats.stream()
//                .map(TransportSeatUtils::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Creates a new transport seat.
//     *
//     * @param transportSeatDTO The TransportSeatDTO object containing seat details.
//     * @return The created TransportSeatDTO.
//     */
//    @Override
//    public TransportSeatDTO createSeat(TransportSeatDTO transportSeatDTO) {
//        log.debug("Creating a new seat with seat number: {}", transportSeatDTO.getSeatNumber());
//
//        Seat seat = TransportSeatUtils.convertToEntity(transportSeatDTO);
//        Seat savedSeat = transportSeatRepository.save(seat);
//
//        log.info("Seat created with seat number: {}", savedSeat.getSeatNumber());
//
//        return TransportSeatUtils.convertToDTO(savedSeat);
//    }
//
//    /**
//     * Updates an existing transport seat.
//     *
//     * @param seatId          The ID of the seat to be updated.
//     * @param transportSeatDTO The updated TransportSeatDTO object containing seat details.
//     * @return The updated TransportSeatDTO.
//     * @throws ResourceNotFoundException if the seat is not found.
//     */
//    @Override
//    public TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO transportSeatDTO) {
//        log.debug("Updating seat with ID: {}", seatId);
//
//        Optional<Seat> optionalSeat = transportSeatRepository.findById(seatId);
//        if (optionalSeat.isPresent()) {
//            Seat seat = optionalSeat.get();
//            seat.setSeatNumber(transportSeatDTO.getSeatNumber());
//            seat.setSeatType(transportSeatDTO.getSeatType());
//            seat.setClassType(transportSeatDTO.getClassType());
//            seat.setStatus(transportSeatDTO.getStatus());
//            seat.setAdminConfigId(seat.getAdminConfigId()); // Assuming serviceDetails are already set
//            Seat updatedSeat = transportSeatRepository.save(seat);
//
//            log.info("Updated seat with ID: {} and seat number: {}", seatId, updatedSeat.getSeatNumber());
//
//            return TransportSeatUtils.convertToDTO(updatedSeat);
//        } else {
//            log.error("Seat with ID {} not found.", seatId);
//            throw new ResourceNotFoundException("Seat with ID " + seatId + " not found.");
//        }
//    }
//
//    /**
//     * Deletes a transport seat.
//     *
//     * @param seatId The ID of the seat to be deleted.
//     * @throws ResourceNotFoundException if the seat is not found.
//     */
//    @Override
//    public void deleteSeat(Long seatId) {
//        if (!transportSeatRepository.existsById(seatId)) {
//            log.error("Seat with ID {} not found.", seatId);
//            throw new ResourceNotFoundException("Seat with ID " + seatId + " not found.");
//        }
//
//        log.info("Deleting seat with ID: {}", seatId);
//        transportSeatRepository.deleteById(seatId);
//    }
//
//    /**
//     * Retrieves all available seats by service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return A list of available seats.
//     */
//    public List<Seat> getAvailableSeatsByDetailId(Long detailId) {
//        log.debug("Fetching available seats for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.getAvailableSeats(seats); // Using utility method
//    }
//
//    /**
//     * Checks if there are any available seats for the given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return true if seats are available, false otherwise.
//     */
//    public boolean areSeatsAvailableByDetailId(Long detailId) {
//        log.debug("Checking availability of seats for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.areSeatsAvailable(seats); // Using utility method
//    }
//
//    /**
//     * Counts the number of available seats for the given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return The count of available seats.
//     */
//    public long countAvailableSeats(Long detailId) {
//        log.debug("Counting available seats for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.countAvailableSeats(seats); // Using utility method
//    }
//
//    /**
//     * Groups seats by their status for the given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return A map grouping seats by their status.
//     */
//    public Map<SeatStatus, List<Seat>> groupSeatsByStatus(Long detailId) {
//        log.debug("Grouping seats by status for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.groupSeatsByStatus(seats); // Using utility method
//    }
//
//    /**
//     * Groups seats by their type for the given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return A map grouping seats by their type.
//     */
//    public Map<SeatType, List<Seat>> groupSeatsByType(Long detailId) {
//        log.debug("Grouping seats by type for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.groupSeatsByType(seats); // Using utility method
//    }
//
//    /**
//     * Groups seats by their class type for the given service detail ID.
//     *
//     * @param detailId The service detail ID.
//     * @return A map grouping seats by their class type.
//     */
//    public Map<ClassType, List<Seat>> groupSeatsByClassType(Long detailId) {
//        log.debug("Grouping seats by class type for service detail ID: {}", detailId);
//        List<Seat> seats = transportSeatRepository.findByServiceDetailsDetailId(detailId);
//        return TransportSeatUtils.groupSeatsByClassType(seats); // Using utility method
//    }
//}
//
//
package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.repository.TransportSeatRepository;
import com.app.reservationbooking.utility.TransportSeatConverterUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransportSeatServiceImpl implements TransportSeatService {

    private final TransportSeatRepository transportSeatRepository; // Injecting the repository

    @Override
    public List<TransportSeatDTO> getSeatsByAdminConfigId(Long adminConfigId) {
        log.info("Fetching all seats for AdminConfig ID: {}", adminConfigId);
        return transportSeatRepository.findByAdminConfigId(adminConfigId)
                .stream()
                .map(TransportSeatConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransportSeatDTO> getAllSeats() {
        log.info("Fetching all seats");
        return transportSeatRepository.findAll()
                .stream()
                .map(TransportSeatConverterUtils::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransportSeatDTO createSeat(TransportSeatDTO dto) {
        log.info("Creating seat: {}", dto);
        Seat seat = TransportSeatConverterUtils.convertToEntity(dto);
        return TransportSeatConverterUtils.convertToDTO(transportSeatRepository.save(seat));
    }

    @Override
    public TransportSeatDTO updateSeat(Long seatId, TransportSeatDTO dto) {
        log.info("Updating seat with ID: {}", seatId);
        Seat existingSeat = transportSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + seatId));

        existingSeat.setSeatNumber(dto.getSeatNumber());
        existingSeat.setSeatType(dto.getSeatType());
        existingSeat.setClassType(dto.getClassType());
        existingSeat.setStatus(dto.getStatus());

        return TransportSeatConverterUtils.convertToDTO(transportSeatRepository.save(existingSeat));
    }

    @Override
    public void deleteSeat(Long seatId) {
        log.info("Deleting seat with ID: {}", seatId);
        Seat seat = transportSeatRepository.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + seatId));
        transportSeatRepository.delete(seat);
    }
}
