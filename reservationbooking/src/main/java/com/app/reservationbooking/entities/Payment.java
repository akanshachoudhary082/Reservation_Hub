package com.app.reservationbooking.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import com.app.reservationbooking.enums.PaymentMethod;
import com.app.reservationbooking.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "payment")
@Getter
@Setter
@ToString
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq")
	@SequenceGenerator(name = "payment_seq", sequenceName = "payment_payment_id_seq", allocationSize = 1)
	@Column(name = "payment_id", nullable = false)
	private Long paymentId;

	@ManyToOne
	@JoinColumn(name = "service_id", nullable = false)
	private ServiceRecord services;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@OneToOne(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Booking reservation;

	@Column(name = "amount", nullable = false)
	private Double amount;

	@Enumerated(EnumType.STRING)
	@Column(name = "payment_method", nullable = false)
	private PaymentMethod paymentMethod;

	@Enumerated(EnumType.STRING)
	@Column(name = "payment_status", nullable = false)
	private PaymentStatus paymentStatus;

	@Column(name = "transaction_id", unique = true, nullable = false)
	private String transactionId;

	@Column(name = "payment_date", nullable = false)
	private LocalDateTime paymentDate;

	public Payment() {
		super();
		this.transactionId = generateTransactionId();
		this.paymentDate = LocalDateTime.now();
	}

	private String generateTransactionId() {
		return UUID.randomUUID().toString();
	}
}
