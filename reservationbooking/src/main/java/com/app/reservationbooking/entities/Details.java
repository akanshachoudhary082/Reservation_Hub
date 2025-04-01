package com.app.reservationbooking.entities;

import com.app.reservationbooking.enums.DetailType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Details {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "detail_id", nullable = false)
	    private Long detailId;

	    @Enumerated(EnumType.STRING)
	    @Column(name = "detail_type", nullable = false)
	    private DetailType detailType; 

	    @Column(name = "source")
	    private String source; 

	    @Column(name = "destination")
	    private String destination; 

	    @Column(name = "departure_time")
	    private String departureTime; 
	    
	    @Column(name = "arrival_time")
	    private String arrivalTime; 
	    
	    @Column(name = "venue")
	    private String venue; 

	    @OneToOne
	    @JoinColumn(name = "service_id", nullable = false)
	    private ServiceRecord services;


		@Override
		public String toString() {
			return "Details [detailId=" + detailId + ", detailType=" + detailType + ", source=" + source
					+ ", destination=" + destination + ", departureTime=" + departureTime + ", arrivalTime="
					+ arrivalTime + ", venue=" + venue + ", services=" + services + "]";
		} 
}
