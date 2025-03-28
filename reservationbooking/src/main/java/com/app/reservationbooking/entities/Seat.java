package com.app.reservationbooking.entities;

import java.util.List;
import com.app.reservationbooking.enums.ClassType;
import com.app.reservationbooking.enums.SeatStatus;
import com.app.reservationbooking.enums.SeatType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seats")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Seat {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "seat_id", nullable = false)
	    private Long seatId;

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
	    private List<Reservation> reservations;

	    @ManyToOne
	    @JoinColumn(name = "service_id", nullable = false)
	    private ServiceRecord services;


		@Override
		public String toString() {
			return "Seat [seatId=" + seatId + ", seatType=" + seatType + ", classType=" + classType + ", status="
					+ status + ", reservations=" + reservations + ", services=" + services + "]";
		}
}
