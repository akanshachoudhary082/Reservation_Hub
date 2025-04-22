package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventsAdminConfigurationRepository extends JpaRepository<AdminConfiguration, Long> {

    @Query("SELECT a FROM AdminConfiguration a WHERE a.moduleCode = 'Events' AND a.moduleCategory = ?1")
    List<AdminConfiguration> findByModuleCategory(String moduleCategory);
}
