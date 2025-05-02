package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository interface for managing Seat entities related to movies.
 */
public interface MovieSeatRepository extends JpaRepository<Seat, Long> {

    /**
     * Retrieves a list of Seat entities based on the specified city, show name, theater name, and show date/time.
     *
     * @param city the city where the theater is located
     * @param showName the name of the movie or show
     * @param theaterName the name of the theater
     * @param showDateTime the date and time of the show
     * @return a list of Seat entities that match the specified criteria, ordered by seat number
     */
    @Query("SELECT a FROM Seat a WHERE a.city = ?1 AND a.showName = ?2 AND a.theaterName = ?3 AND a.showDateTime = ?4 ORDER BY CAST(a.seatNumber AS INTEGER) ASC")
    List<Seat> findByCityAndDescriptionAndTheatreNameAndDateTime(String city, String showName, String theaterName, LocalDateTime showDateTime);
}