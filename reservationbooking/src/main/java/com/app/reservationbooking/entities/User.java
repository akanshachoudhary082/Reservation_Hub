package com.app.reservationbooking.entities;

import java.util.List;

import com.app.reservationbooking.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"bookings", "payments"}) // avoid stack overflow
@Builder
public class User extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "users_seq")
	@SequenceGenerator(name = "users_seq", sequenceName = "users_user_id_seq", allocationSize = 1)
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "mobile_number", unique = true, nullable = false)
	private String mobileNumber;

	@Column(name = "email", unique = true, nullable = false)
	private String userEmail;

	@Column(name = "password")
	private String password;

	@Column(name = "country_code")
	private String countryCode;

	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;

//	@OneToMany(mappedBy = "user")
//	private List<Seat> seats;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Booking> bookings;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Payment> payments;

//	@OneToMany(mappedBy = "user")
//	private List<ServiceRecord> services;



}
