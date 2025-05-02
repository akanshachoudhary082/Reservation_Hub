package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviesAdminConfigurationRepository extends JpaRepository<AdminConfiguration, Long> {

    /**
     * Retrieves a list of unique movie names based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of unique names of movies that belong to the specified module category
     */
    @Query("SELECT a.description FROM AdminConfiguration a WHERE a.moduleCode = 'Movies' AND a.moduleCategory = ?1 GROUP BY a.description")
    List<String> findByModuleCategory(String moduleCategory);

    /**
     * Retrieves a list of AdminConfiguration entities based on the specified description and module category.
     *
     * @param description the name of the movie to search for
     * @return a list of AdminConfiguration entities that match the specified description and module category
     */
    @Query("SELECT a FROM AdminConfiguration a WHERE a.moduleCode = 'Movies' AND a.description = ?1 AND a.moduleCategory = ?2")
    List<AdminConfiguration> findByDescriptionAndModuleCategory(String description, String city);
}