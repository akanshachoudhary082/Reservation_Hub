package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.AdminConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<AdminConfiguration, Long> {

   //List<AdminConfiguration> findByCity(AdminConfiguration moduleCategory);
}
