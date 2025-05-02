package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.MovieNotFoundException;
import com.app.reservationbooking.customexception.MovieSeatsNotAvailableException;
import com.app.reservationbooking.dto.MovieDTO;
import com.app.reservationbooking.dto.MovieSeatDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.entities.Seat;
import com.app.reservationbooking.repository.MovieSeatRepository;
import com.app.reservationbooking.repository.MoviesAdminConfigurationRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MoviesAdminConfigurationRepository moviesAdminConfigurationRepository;

    @Autowired
    private MovieSeatRepository movieSeatRepository;

    private static final Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

    /**
     * Retrieves a list of movies based on the specified module category.
     *
     * @param moduleCategory the city selected to filter movies
     * @return a list of MovieDTO objects that belong to the specified module category
     */
    @Override
    public List<MovieDTO> getMoviesByModuleCategory(String moduleCategory) {
        logger.info("Fetching movies for module category: {}", moduleCategory);

        List<String> movieDescriptions = moviesAdminConfigurationRepository.findByModuleCategory(moduleCategory);
        if (movieDescriptions == null || movieDescriptions.isEmpty()) {
            throw new MovieNotFoundException("No movies found for module category: " + moduleCategory);
        }

        return movieDescriptions.stream()
                .map(description -> new MovieDTO(null, description, null))
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of movies based on the specified description and module category.
     *
     * @param description the name of the movie to search for
     * @param moduleCategory the city selected to filter movies
     * @return a list of MovieDTO objects that match the specified description and module category
     */
    @Override
    public List<MovieDTO> getMoviesByDescriptionAndModuleCategory(String description, String moduleCategory) {
        logger.info("Fetching movies for description: {} and module category: {}", description, moduleCategory);

        List<AdminConfiguration> movies = moviesAdminConfigurationRepository.findByDescriptionAndModuleCategory(description, moduleCategory);
        if (movies == null || movies.isEmpty()) {
            throw new MovieNotFoundException("No movies found for description: " + description + " and module category: " + moduleCategory);
        }

        return movies.stream()
                .map(movie -> {
                    logger.debug("Movie Start Point: {}", movie.getStartPoint());
                    return new MovieDTO(movie.getStartPoint(), movie.getDescription(), movie.getName());
                })
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of available movie seats based on the specified city, movie description, theater name, and show date/time.
     *
     * @param city the city where the theater is located
     * @param showName the name of the movie for which to retrieve seats
     * @param theaterName the name of the theater
     * @param showDateTime the date and time of the show
     * @return a list of MovieSeatDTO objects representing the available seats for the specified movie and showtime
     */
    @Override
    @Transactional
    public List<MovieSeatDTO> getMovieSeatsByDescriptionAndCityAndDateTime(String city, String showName, String theaterName, LocalDateTime showDateTime) {
        logger.info("Fetching available seats for city: {}, movie: {}, theater: {}, dateTime: {}", city, showName, theaterName, showDateTime);

        List<Seat> movieSeats = movieSeatRepository.findByCityAndDescriptionAndTheatreNameAndDateTime(city, showName, theaterName, showDateTime);
        if (movieSeats == null || movieSeats.isEmpty()) {
            throw new MovieSeatsNotAvailableException("No available seats for movie: " + showName + " in theater: " + theaterName + " at " + showDateTime);
        }

        logger.info("Available seats: {}", movieSeats.size());

        return movieSeats.stream()
                .map(movieSeat -> {
                    logger.debug("Movie Seat Number: {}", movieSeat.getSeatNumber());
                    return new MovieSeatDTO(movieSeat.getSeatNumber(), movieSeat.getStatus(), movieSeat.getSeatPrice(), movieSeat.getSeatType());
                })
                .collect(Collectors.toList());
    }
}