package com.app.reservationbooking.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@MappedSuperclass
@Getter
@Setter
public class BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
    @CreationTimestamp
    @Column(name="creation_date")
    private LocalDate creationDate;
    @UpdateTimestamp
    @Column(name="updated_on")
    private LocalDate updatedOn;

    @Override
    public String toString() {
        return "BaseEntity [id=" + id + ", creationDate=" + creationDate + ", updatedOn=" + updatedOn + "]";
    }

}
