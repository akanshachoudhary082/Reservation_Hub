package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MoviesAdminConfigurationRepository extends JpaRepository<AdminConfiguration, Long> {

    /**
     * Retrieves a list of AdminConfiguration entities for the "Movies" module
     * filtered by a specific module category.
     *
     * @param moduleCategory the category of the module (e.g., city or region)
     * @return a list of AdminConfiguration entities matching the given category
     */
    @Query("SELECT a FROM AdminConfiguration a WHERE a.moduleCode = 'Movies' AND a.moduleCategory = ?1")
    List<AdminConfiguration> findByModuleCategory(String moduleCategory);

    /**
     * Retrieves a list of AdminConfiguration entities for the "Movies" module
     * filtered by both description and module category.
     *
     * @param description the description of the configuration
     * @param city the module category (typically representing a city)
     * @return a list of AdminConfiguration entities matching the description and category
     */
    @Query("SELECT a FROM AdminConfiguration a WHERE a.moduleCode = 'Movies' AND a.description = ?1 AND a.moduleCategory = ?2")
    List<AdminConfiguration> findByDescriptionAndModuleCategory(String description, String city);
}