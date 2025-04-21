package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.MovieDTO; // Import the MovieDTO class
import java.util.List;

public interface MovieService {
    List<MovieDTO> getMoviesByModuleCategory(String moduleCategory); // Change return type to List<MovieDTO>

    List<MovieDTO> getMoviesByDescriptionAndModuleCategory(String description, String city);
}