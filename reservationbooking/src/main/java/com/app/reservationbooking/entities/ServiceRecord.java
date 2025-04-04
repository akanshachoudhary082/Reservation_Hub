package com.app.reservationbooking.entities;

import java.util.List;
import com.app.reservationbooking.enums.ServiceType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ServiceRecord extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "services_seq")
	@SequenceGenerator(name = "services_seq", sequenceName = "services_service_record_id_seq", allocationSize = 1)
	@Column(name = "service_id", nullable = false)
	private Long serviceRecordId;

	@Enumerated(EnumType.STRING)
	@Column(name = "service_type", nullable = false)
	private ServiceType serviceType;

//	@ManyToOne
//	@JoinColumn(name = "user_id", nullable = false)
//	private User user;

	@OneToOne(mappedBy = "services", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private ServiceDetails details;


}
