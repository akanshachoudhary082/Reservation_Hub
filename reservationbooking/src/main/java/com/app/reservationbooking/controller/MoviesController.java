package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.MovieDTO;
import com.app.reservationbooking.dto.MovieSeatDTO;
import com.app.reservationbooking.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/movies")
public class MoviesController {

    private static final Logger logger = LoggerFactory.getLogger(MoviesController.class);

    @Autowired
    private MovieService movieService;

    /**
     * Retrieves a list of movies available in a specific city.
     *
     * @param city the city for which to retrieve movies
     * @return a ResponseEntity containing a list of MovieDTO objects
     */
    @GetMapping("/get-movies/{city}")
    public ResponseEntity<List<MovieDTO>> getMoviesByCity(@PathVariable String city) {
        logger.info("Fetching movies for city: {}", city);
        List<MovieDTO> movies = movieService.getMoviesByModuleCategory(city);
        return ResponseEntity.ok(movies);
    }

    /**
     * Retrieves showtimes for a specific movie name in a given city.
     *
     * @param description the name of the movie
     * @param city the city where the movie is being shown
     * @return a ResponseEntity containing a list of MovieDTO objects
     */
    @GetMapping("/get-showtimes/{description}")
    public ResponseEntity<List<MovieDTO>> getMovieTimings(@PathVariable String description, @RequestParam String city) {
        logger.info("Fetching showtimes for movie: {} in city: {}", description, city);
        List<MovieDTO> movies = movieService.getMoviesByDescriptionAndModuleCategory(description, city);
        return ResponseEntity.ok(movies);
    }

    /**
     * Retrieves available seats for a specific movie at a given theater and time.
     *
     * @param city the city where the theater is located
     * @param description the name of the movie
     * @param theaterName the name of the theater
     * @param datetime the date and time of the show
     * @return a ResponseEntity containing a list of MovieSeatDTO objects
     */
    @GetMapping("/get-seats/{city}/{description}/{theaterName}/{datetime}")
    public ResponseEntity<List<MovieSeatDTO>> getSeats(@PathVariable String city, @PathVariable String description, @PathVariable String theaterName, @PathVariable LocalDateTime datetime) {
        logger.info("Fetching seats for city: {}, movie: {}, theater: {}, dateTime: {}", city, description, theaterName, datetime);
        List<MovieSeatDTO> movieSeats = movieService.getMovieSeatsByDescriptionAndCityAndDateTime(city, description, theaterName, datetime);
        return ResponseEntity.ok(movieSeats);
    }
}