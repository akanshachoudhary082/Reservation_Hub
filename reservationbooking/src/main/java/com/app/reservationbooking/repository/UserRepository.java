package com.app.reservationbooking.repository;


import com.app.reservationbooking.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUserEmail(String  userEmail);
    //derived query metho
    boolean existsByUserEmail(String userEmail);
}
