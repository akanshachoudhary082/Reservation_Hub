package com.app.reservationbooking.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BaseEntity {
    @Column(name="created_by")
    private String createdBy;

    @CreationTimestamp
    @Column(name="creation_date")
    private LocalDateTime creationDate;

    @Column(name="updated_by")
    private String updatedBy;

    @UpdateTimestamp
    @Column(name="updated_on")
    private LocalDateTime updatedOn;


    @Column(name="is_active")
    private Boolean isActive;


}
