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
import lombok.*;

@Entity
@Table(name = "services")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ServiceRecord {

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


		@Override
		public String toString() {
			return "Services [serviceId=" + serviceId + ", serviceType=" + serviceType + ", user=" + user + ", details="
					+ details + ", reservations=" + reservations + ", seats=" + seats + "]";
		} 
}
