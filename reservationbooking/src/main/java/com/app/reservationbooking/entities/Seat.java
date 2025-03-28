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

@Entity
@Table(name = "seats")
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
	    private Services services;

		public Seat() {
			super();
		}

		public Long getSeatId() {
			return seatId;
		}

		public void setSeatId(Long seatId) {
			this.seatId = seatId;
		}

		public SeatType getSeatType() {
			return seatType;
		}

		public void setSeatType(SeatType seatType) {
			this.seatType = seatType;
		}

		public ClassType getClassType() {
			return classType;
		}

		public void setClassType(ClassType classType) {
			this.classType = classType;
		}

		public SeatStatus getStatus() {
			return status;
		}

		public void setStatus(SeatStatus status) {
			this.status = status;
		}

		public List<Reservation> getReservations() {
			return reservations;
		}	

		public void setReservations(List<Reservation> reservations) {
			this.reservations = reservations;
		}

		public Services getServices() {
			return services;
		}

		public void setServices(Services services) {
			this.services = services;
		} 

		@Override
		public String toString() {
			return "Seat [seatId=" + seatId + ", seatType=" + seatType + ", classType=" + classType + ", status="
					+ status + ", reservations=" + reservations + ", services=" + services + "]";
		}
}
