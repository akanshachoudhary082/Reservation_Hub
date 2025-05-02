package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for managing AdminConfiguration entities related to events.
 */
@Repository
public interface EventsAdminConfigurationRepository extends JpaRepository<AdminConfiguration, Long> {

    /**
     * Retrieves a list of AdminConfiguration entities based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of AdminConfiguration entities that belong to the specified module category
     */
    @Query("SELECT a FROM AdminConfiguration a WHERE a.moduleCode = 'Events' AND a.moduleCategory = ?1")
    List<AdminConfiguration> findByModuleCategory(String moduleCategory);
}