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

@Entity
@Table(name = "details")
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
	    private Services services;

		public Details() {
			super();
		}

		public Long getDetailId() {
			return detailId;
		}

		public void setDetailId(Long detailId) {
			this.detailId = detailId;
		}

		public DetailType getDetailType() {
			return detailType;
		}

		public void setDetailType(DetailType detailType) {
			this.detailType = detailType;
		}

		public String getSource() {
			return source;
		}

		public void setSource(String source) {
			this.source = source;
		}

		public String getDestination() {
			return destination;
		}

		public void setDestination(String destination) {
			this.destination = destination;
		}

		public String getDepartureTime() {
			return departureTime;
		}

		public void setDepartureTime(String departureTime) {
			this.departureTime = departureTime;
		}

		public String getArrivalTime() {
			return arrivalTime;
		}

		public void setArrivalTime(String arrivalTime) {
			this.arrivalTime = arrivalTime;
		}

		public String getVenue() {
			return venue;
		}

		public void setVenue(String venue) {
			this.venue = venue;
		}

		public Services getServices() {
			return services;
		}

		public void setServices(Services services) {
			this.services = services;
		}

		@Override
		public String toString() {
			return "Details [detailId=" + detailId + ", detailType=" + detailType + ", source=" + source
					+ ", destination=" + destination + ", departureTime=" + departureTime + ", arrivalTime="
					+ arrivalTime + ", venue=" + venue + ", services=" + services + "]";
		} 
}
