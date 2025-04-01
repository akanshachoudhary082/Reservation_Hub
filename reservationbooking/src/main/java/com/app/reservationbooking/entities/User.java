package com.app.reservationbooking.entities;

import java.util.List;

import com.app.reservationbooking.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {
	
	@Column(name = "first_name", nullable = false)
	private String firstName;
	
	@Column(name = "last_name", nullable = false)
	private String lastName;
	
	@Column(name = "mobile_number", unique = true, nullable = false)
	private String mobileNumber;
	
	@Column(name = "email", unique = true, nullable = false)
	private String userEmail;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToMany(mappedBy = "user")
	private List<Reservation> reservations;
	
	@OneToMany(mappedBy = "user")
	private List<Payment> payments;
	
	@OneToMany(mappedBy = "user")
	private List<ServiceRecord> services;

	@Override
	public String toString() {
		return "User{" +
				"firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", mobileNumber='" + mobileNumber + '\'' +
				", userEmail='" + userEmail + '\'' +
				", password='" + password + '\'' +
				", role=" + role +
				", reservations=" + reservations +
				", payments=" + payments +
				", services=" + services +
				'}';
	}
}
