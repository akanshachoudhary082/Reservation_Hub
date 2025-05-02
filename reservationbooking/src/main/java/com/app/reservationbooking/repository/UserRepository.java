package com.app.reservationbooking.repository;


import com.app.reservationbooking.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for managing {@link User} entities.
 * Provides CRUD operations along with custom queries to find and check existence by user email.
 */

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    /**
     * Retrieves a {@link User} entity by its email address.
     *
     * @param userEmail the email address of the user
     * @return an {@link Optional} containing the {@link User} if found, or empty if not
     */
    Optional<User> findByUserEmail(String  userEmail);

    /**
     * Checks if a user with the given email already exists in the system.
     *
     * @param userEmail the email address to check for existence
     * @return true if a user with the provided email exists, false otherwise
     */
    boolean existsByUserEmail(String userEmail);
}
