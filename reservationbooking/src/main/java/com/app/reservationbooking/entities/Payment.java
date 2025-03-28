package com.app.reservationbooking.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import com.app.reservationbooking.enums.PaymentMethod;
import com.app.reservationbooking.enums.PaymentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "payment")
@Getter
@Setter
public class Payment {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "payment_id", nullable = false)
	    private Long paymentId;

	    @ManyToOne
	    @JoinColumn(name = "service_id", nullable = false)
	    private ServiceRecord services;

	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private User user; 

	    @ManyToOne
	    @JoinColumn(name = "reservation_id", nullable = false)
	    private Reservation reservation; 

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
	        this.transactionId = generateTransactionId(); // Generate ID on creation
	        this.paymentDate = LocalDateTime.now(); // Set payment date to current time
	    }

	    private String generateTransactionId() {
	        return UUID.randomUUID().toString(); // Generates a unique transaction ID
	    }


		@Override
		public String toString() {
			return "Payment [paymentId=" + paymentId + ", services=" + services + ", user=" + user + ", reservation="
					+ reservation + ", amount=" + amount + ", paymentMethod=" + paymentMethod + ", paymentStatus="
					+ paymentStatus + ", transactionId=" + transactionId + ", paymentDate=" + paymentDate + "]";
		} 
}
