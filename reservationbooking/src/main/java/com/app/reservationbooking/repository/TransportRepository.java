package com.app.reservationbooking.repository;


import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransportRepository extends JpaRepository<AdminConfiguration, Long> {


    /**
     * Retrieves all transport services for a specific transport type (e.g., BUS, TRAIN) on a given date.
     * Case-insensitive match on moduleCode.
     *
     * @param availableOn Date of journey
     * @param moduleCode  Transport type (e.g., BUS, TRAIN, FLIGHT)
     * @return List of AdminConfiguration entries matching date and transport type
     */
    @Query("SELECT a FROM AdminConfiguration a WHERE a.availableOn = :availableOn AND LOWER(a.moduleCode) = LOWER(:moduleCode)")
    List<AdminConfiguration> findByAvailableOnAndModuleCode(@Param("availableOn") LocalDate availableOn, @Param("moduleCode") String moduleCode);


    /**
     * Searches transport services on a given date and transport type, where the source and destination
     * cities appear somewhere in the `description` field.
     * This is useful when `startPoint` and `endPoint` are not stored as city names.
     *
     * @param availableOn     Date of journey
     * @param moduleCode      Transport type (e.g., BUS, TRAIN, FLIGHT)
     * @param sourceCity      Source city to search in description
     * @param destinationCity Destination city to search in description
     * @return List of matching AdminConfiguration records
     */

    @Query("SELECT ac FROM AdminConfiguration ac WHERE ac.availableOn = :availableOn " +
            "AND LOWER(ac.moduleCode) = LOWER(:moduleCode) " +
            "AND LOWER(ac.description) LIKE LOWER(CONCAT('%', :sourceCity, '%')) " +
            "AND LOWER(ac.description) LIKE LOWER(CONCAT('%', :destinationCity, '%'))")
    List<AdminConfiguration> findByAvailableOnAndModuleCodeAndRoute(
            @Param("availableOn") LocalDate availableOn,
            @Param("moduleCode") String moduleCode,
            @Param("sourceCity") String sourceCity,
            @Param("destinationCity") String destinationCity);


}
