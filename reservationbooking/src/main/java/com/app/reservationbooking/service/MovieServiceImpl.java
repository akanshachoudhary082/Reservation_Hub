package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.MovieDTO;
import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.MoviesAdminConfigurationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MoviesAdminConfigurationRepository moviesAdminConfigurationRepository;

    private static final Logger logger = LoggerFactory.getLogger(MovieServiceImpl.class);

    @Override
    public List<MovieDTO> getMoviesByModuleCategory(String moduleCategory) {
        List<AdminConfiguration> movies = moviesAdminConfigurationRepository.findByModuleCategory(moduleCategory);

        return movies.stream()
                .map(movie -> {
                    return new MovieDTO(movie.getStartPoint(), movie.getDescription(), movie.getName());
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<MovieDTO> getMoviesByDescriptionAndModuleCategory(String description, String city) {
        List<AdminConfiguration> movies = moviesAdminConfigurationRepository.findByDescriptionAndModuleCategory(description, city);
        return movies.stream()
                .map(movie -> {
                    return new MovieDTO(movie.getStartPoint(), movie.getName(), movie.getDescription());
                })
                .collect(Collectors.toList());
    }
}