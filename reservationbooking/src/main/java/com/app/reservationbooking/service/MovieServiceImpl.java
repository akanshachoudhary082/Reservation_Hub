package com.app.reservationbooking.service;

import com.app.reservationbooking.entities.AdminConfiguration;
import com.app.reservationbooking.repository.MoviesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    MoviesRepository moviesRepository;

    @Override
    public List<AdminConfiguration> getAllMovies(AdminConfiguration moduleCategory) {

        return moviesRepository.findMoviesByCity(moduleCategory);
    }
}
