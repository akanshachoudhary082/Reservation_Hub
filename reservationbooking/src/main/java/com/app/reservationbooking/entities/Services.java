package com.app.reservationbooking.entities;

import java.util.List;
import com.app.reservationbooking.enums.ServiceType;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "services")
public class Services {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "service_id", nullable = false)
	    private Long serviceId;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "service_type", nullable = false)
	    private ServiceType serviceType; 

	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user; 

	    @OneToOne(mappedBy = "services", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private Details details; 

	    @OneToMany(mappedBy = "services", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private List<Reservation> reservations; 

	    @OneToMany(mappedBy = "services", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private List<Seat> seats;

		public Services() {
			super();
		}

		public Long getServiceId() {
			return serviceId;
		}

		public void setServiceId(Long serviceId) {
			this.serviceId = serviceId;
		}

		public ServiceType getServiceType() {
			return serviceType;
		}

		public void setServiceType(ServiceType serviceType) {
			this.serviceType = serviceType;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public Details getDetails() {
			return details;
		}

		public void setDetails(Details details) {
			this.details = details;
		}

		public List<Reservation> getReservations() {
			return reservations;
		}

		public void setReservations(List<Reservation> reservations) {
			this.reservations = reservations;
		}

		public List<Seat> getSeats() {
			return seats;
		}

		public void setSeats(List<Seat> seats) {
			this.seats = seats;
		}

		@Override
		public String toString() {
			return "Services [serviceId=" + serviceId + ", serviceType=" + serviceType + ", user=" + user + ", details="
					+ details + ", reservations=" + reservations + ", seats=" + seats + "]";
		} 
}
