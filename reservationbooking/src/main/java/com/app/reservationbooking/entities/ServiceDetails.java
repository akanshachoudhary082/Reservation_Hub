package com.app.reservationbooking.entities;

import com.app.reservationbooking.enums.ServiceDetailType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "details")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="detailId")
@SequenceGenerator(name = "details_seq", sequenceName = "details_detail_id_seq", allocationSize = 1)
public class ServiceDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "details_seq")
    @Column(name = "detail_id", nullable = false)
    private Long detailId;

    @Enumerated(EnumType.STRING)
    @Column(name = "detail_type", nullable = false)
    private ServiceDetailType detailType;

    @ManyToOne
    //@JsonBackReference
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceRecord services;

//    @OneToMany(mappedBy = "details", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Booking> bookings;

	@OneToMany(mappedBy = "serviceDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Seat> seats;


}
