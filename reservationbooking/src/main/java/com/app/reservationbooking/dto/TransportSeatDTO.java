package com.app.reservationbooking.dto;
import com.app.reservationbooking.enums.ClassType;
import com.app.reservationbooking.enums.SeatStatus;
import com.app.reservationbooking.enums.SeatType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransportSeatDTO {
    private Long seatId;

    private Long seatNumber;

    private SeatType seatType;

    private ClassType classType;

    private SeatStatus status;

    private Long adminConfigId;
}
