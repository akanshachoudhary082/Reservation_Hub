package com.app.reservationbooking.entities;

import com.app.reservationbooking.enums.ServiceDetailType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ServiceDetails extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "details_seq")
	@SequenceGenerator(name = "details_seq", sequenceName = "details_detail_id_seq", allocationSize = 1)
	@Column(name = "detail_id", nullable = false)
	private Long detailId;

	@Enumerated(EnumType.STRING)
	@Column(name = "detail_type", nullable = false)
	private ServiceDetailType detailType;

	@Column(name = "source")
	private String source;

	@Column(name = "destination")
	private String destination;


	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Column(name = "departure_time")
	private LocalDateTime departureTime;

	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	@Column(name = "arrival_time")
	private LocalDateTime arrivalTime;

	@Column(name = "venue")
	private String venue;

	@OneToOne
	@JoinColumn(name = "service_id", nullable = false)
	private ServiceRecord services;

	@OneToMany(mappedBy = "details", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Booking> bookings;

//	   @OneToMany(mappedBy = "details", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	   private List<Seat> seats;



}
