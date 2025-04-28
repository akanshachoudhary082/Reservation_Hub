package com.app.reservationbooking.utility;
//
//import com.app.reservationbooking.dto.TransportSeatDTO;
//import com.app.reservationbooking.entities.Seat;
//import com.app.reservationbooking.enums.SeatStatus;
//import com.app.reservationbooking.enums.SeatType;
//import com.app.reservationbooking.enums.ClassType;
//
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//public class TransportSeatUtils {
//
//    /**
//     * Converts a Seat entity to a TransportSeatDTO.
//     *
//     * @param seat The Seat entity to convert.
//     * @return A TransportSeatDTO representation of the Seat entity.
//     */
//    public static TransportSeatDTO convertToDTO(Seat seat) {
//        return TransportSeatDTO.builder()
//                .seatId(seat.getSeatId())
//                .seatNumber(seat.getSeatNumber())
//                .seatType(seat.getSeatType())
//                .classType(seat.getClassType())
//                .status(seat.getStatus())
//                .build();
//    }
//
//    /**
//     * Converts a TransportSeatDTO to a Seat entity.
//     * Defaults the status to AVAILABLE.
//     *
//     * @param transportSeatDTO The TransportSeatDTO to convert.
//     * @return A Seat entity representation of the DTO.
//     */
//    public static Seat convertToEntity(TransportSeatDTO transportSeatDTO) {
//        Seat seat = new Seat();
//        seat.setSeatNumber(transportSeatDTO.getSeatNumber());
//        seat.setSeatType(transportSeatDTO.getSeatType());
//        seat.setClassType(transportSeatDTO.getClassType());
//        seat.setStatus(SeatStatus.AVAILABLE); // Default to available
//        // Set serviceDetails based on the provided ID
//        // Assume you are setting serviceDetails properly based on business logic.
//        return seat;
//    }
//
//    /**
//     * Checks if at least one seat is available in the list.
//     *
//     * @param seats The list of seats to check.
//     * @return True if at least one seat is available, false otherwise.
//     */
//    public static boolean areSeatsAvailable(List<Seat> seats) {
//        return seats.stream().anyMatch(seat -> seat.getStatus() == SeatStatus.AVAILABLE);
//    }
//
//    /**
//     * Gets all available seats from a list of seats.
//     *
//     * @param seats The list of seats to filter.
//     * @return A list of available seats.
//     */
//    public static List<Seat> getAvailableSeats(List<Seat> seats) {
//        return filterSeatsByStatus(seats, SeatStatus.AVAILABLE);
//    }
//
//    /**
//     * Gets all booked seats from a list of seats.
//     *
//     * @param seats The list of seats to filter.
//     * @return A list of booked seats.
//     */
//    public static List<Seat> getBookedSeats(List<Seat> seats) {
//        return filterSeatsByStatus(seats, SeatStatus.BOOKED);
//    }
//
//    /**
//     * Filters seats by a specific status.
//     *
//     * @param seats The list of seats to filter.
//     * @param status The status to filter by.
//     * @return A list of seats matching the specified status.
//     */
//    public static List<Seat> filterSeatsByStatus(List<Seat> seats, SeatStatus status) {
//        return seats.stream()
//                .filter(seat -> seat.getStatus() == status)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Filters seats by a specific seat type (e.g., SLEEPER, WINDOW).
//     *
//     * @param seats The list of seats to filter.
//     * @param type The seat type to filter by.
//     * @return A list of seats matching the specified seat type.
//     */
//    public static List<Seat> getSeatsByType(List<Seat> seats, SeatType type) {
//        return seats.stream()
//                .filter(seat -> seat.getSeatType() == type)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Filters seats by a specific class type (e.g., AC, NON_AC, VIP).
//     *
//     * @param seats The list of seats to filter.
//     * @param classType The class type to filter by.
//     * @return A list of seats matching the specified class type.
//     */
//    public static List<Seat> getSeatsByClassType(List<Seat> seats, ClassType classType) {
//        return seats.stream()
//                .filter(seat -> seat.getClassType() == classType)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Groups seats by their status (AVAILABLE / BOOKED).
//     *
//     * @param seats The list of seats to group.
//     * @return A map of seats grouped by their status.
//     */
//    public static Map<SeatStatus, List<Seat>> groupSeatsByStatus(List<Seat> seats) {
//        return seats.stream()
//                .collect(Collectors.groupingBy(Seat::getStatus));
//    }
//
//    /**
//     * Groups seats by their seat type (e.g., WINDOW, SLEEPER).
//     *
//     * @param seats The list of seats to group.
//     * @return A map of seats grouped by their seat type.
//     */
//    public static Map<SeatType, List<Seat>> groupSeatsByType(List<Seat> seats) {
//        return seats.stream()
//                .collect(Collectors.groupingBy(Seat::getSeatType));
//    }
//
//    /**
//     * Groups seats by their class type (e.g., AC, NON_AC).
//     *
//     * @param seats The list of seats to group.
//     * @return A map of seats grouped by their class type.
//     */
//    public static Map<ClassType, List<Seat>> groupSeatsByClassType(List<Seat> seats) {
//        return seats.stream()
//                .collect(Collectors.groupingBy(Seat::getClassType));
//    }
//
//    /**
//     * Gets the first available seat from a list of seats.
//     *
//     * @param seats The list of seats to check.
//     * @return An Optional containing the first available seat if one exists, otherwise an empty Optional.
//     */
//    public static Optional<Seat> getFirstAvailableSeat(List<Seat> seats) {
//        return seats.stream()
//                .filter(seat -> seat.getStatus() == SeatStatus.AVAILABLE)
//                .findFirst();
//    }
//
//    /**
//     * Counts the number of available seats in a list.
//     *
//     * @param seats The list of seats to count.
//     * @return The count of available seats.
//     */
//    public static long countAvailableSeats(List<Seat> seats) {
//        return seats.stream()
//                .filter(seat -> seat.getStatus() == SeatStatus.AVAILABLE)
//                .count();
//    }
//
//    /**
//     * Counts the number of booked seats in a list.
//     *
//     * @param seats The list of seats to count.
//     * @return The count of booked seats.
//     */
//    public static long countBookedSeats(List<Seat> seats) {
//        return seats.stream()
//                .filter(seat -> seat.getStatus() == SeatStatus.BOOKED)
//                .count();
//    }
//}

import com.app.reservationbooking.dto.TransportSeatDTO;
import com.app.reservationbooking.entities.Seat;

public class TransportSeatConverterUtils {

    // Convert Seat entity to TransportSeatDTO using builder
    public static TransportSeatDTO convertToDTO(Seat seat) {
        return TransportSeatDTO.builder()
                .seatId(seat.getSeatId())  // This remains the same
                .seatNumber(seat.getSeatNumber())  // Directly return as String
                .seatType(seat.getSeatType())
                .classType(seat.getClassType())
                .status(seat.getStatus())
                .detailId(seat.getDetailId())
                .seatPrice(seat.getSeatPrice())// Ensure that detailId is included here
                .build();
    }

    // Convert TransportSeatDTO to Seat entity using builder
    public static Seat convertToEntity(TransportSeatDTO dto) {
        return Seat.builder()
                .detailId(dto.getDetailId())  // No change here; it's correctly setting the detailId
                .seatNumber(dto.getSeatNumber())  // Directly set as String
                .seatType(dto.getSeatType())
                .classType(dto.getClassType())
                .status(dto.getStatus())
                .seatPrice(dto.getSeatPrice())
                .build();
    }

}
//
