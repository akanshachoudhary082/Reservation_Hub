package com.app.reservationbooking.controller;

import com.app.reservationbooking.dto.MovieDTO;
import com.app.reservationbooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/get-movies/{city}")
    public ResponseEntity<List<MovieDTO>> getMoviesByCity(@PathVariable String city) {
        System.out.println(city);
        List<MovieDTO> movies = movieService.getMoviesByModuleCategory(city);
        return ResponseEntity.ok(movies); // Return the list of movies with imageData and config3
    }

    @GetMapping("get-showtimes/{description}?module_category={city}")
    public ResponseEntity<List<MovieDTO>> getMovieTimings(@PathVariable String description, @PathVariable String city){
        List<MovieDTO> movies = movieService.getMoviesByDescriptionAndModuleCategory(description, city);
        return ResponseEntity.ok(movies);
    }
}