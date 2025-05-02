package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.MovieDTO; // Import the MovieDTO class
import com.app.reservationbooking.dto.MovieSeatDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface MovieService {

    /**
     * Retrieves a list of movies based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of MovieDTO objects that belong to the specified module category
     */
    List<MovieDTO> getMoviesByModuleCategory(String moduleCategory);

    /**
     * Retrieves a list of movies based on the specified description and module category.
     *
     * @param description the name of the movie to search for
     * @param moduleCategory the city selected to filter movies
     * @return a list of MovieDTO objects that match the specified description and module category
     */
    List<MovieDTO> getMoviesByDescriptionAndModuleCategory(String description, String moduleCategory);

    /**
     * Retrieves a list of available movie seats based on the specified city, movie description, theater name, and show date/time.
     *
     * @param city the city where the theater is located
     * @param description the name of the movie for which to retrieve seats
     * @param theaterName the name of the theater
     * @param showDateTime the date and time of the show
     * @return a list of MovieSeatDTO objects representing the available seats for the specified movie and showtime
     */
    List<MovieSeatDTO> getMovieSeatsByDescriptionAndCityAndDateTime(String city, String description, String theaterName, LocalDateTime showDateTime);
}