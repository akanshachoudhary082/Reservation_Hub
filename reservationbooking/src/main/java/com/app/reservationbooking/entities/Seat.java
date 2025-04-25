package com.app.reservationbooking.entities;

import java.util.List;
import com.app.reservationbooking.enums.ClassType;
import com.app.reservationbooking.enums.SeatStatus;
import com.app.reservationbooking.enums.SeatType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Seat extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seats_seq")
	@SequenceGenerator(name = "seats_seq", sequenceName = "seats_seat_id_seq", allocationSize = 1)
	@Column(name = "seat_id", nullable = false)
	private Long seatId;

	@Column(name = "admin_config_id", nullable = false)
	private long adminConfigId;

	@Column(name = "seat_number")
	private Long seatNumber;

	@Enumerated(EnumType.STRING)
	@Column(name = "seat_type", nullable = false)
	private SeatType seatType;

	@Enumerated(EnumType.STRING)
	@Column(name = "class_type")
	private ClassType classType;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private SeatStatus status;

	@OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Booking> bookings;


//	@ManyToOne
//	@JoinColumn(name = "detail_id", nullable = false)
//	private ServiceDetails serviceDetails;

}