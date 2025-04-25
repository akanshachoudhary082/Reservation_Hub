package com.app.reservationbooking.entities;

import java.util.List;
import com.app.reservationbooking.enums.MainServiceType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="serviceRecordId")
public class MainServiceRecord extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "services_seq")
	@SequenceGenerator(name = "services_seq", sequenceName = "services_service_record_id_seq", allocationSize = 1)
	@Column(name = "service_id", nullable = false)
	private Long serviceRecordId;

	@Enumerated(EnumType.STRING)
	@Column(name = "service_type", nullable = false)
	private MainServiceType serviceType;

	@OneToMany(mappedBy = "services", cascade = CascadeType.ALL,orphanRemoval=true)
	//		@JsonManagedReference
	private List<SubServiceDetails> details;


}
