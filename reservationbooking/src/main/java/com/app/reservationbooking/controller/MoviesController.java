package com.app.reservationbooking.controller;

import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    MovieService movieService;

    @GetMapping("/get-movies")
    public ResponseEntity<List<AdminConfiguration>> getMovies(@RequestParam AdminConfiguration moduleCategory){

        List <AdminConfiguration> movies =  movieService.getAllMovies(moduleCategory);

        if (movies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(movies);
    }
}
