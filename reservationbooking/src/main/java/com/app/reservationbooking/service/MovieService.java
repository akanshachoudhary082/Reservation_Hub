package com.app.reservationbooking.service;

import com.app.reservationbooking.entities.AdminConfiguration;

import java.util.List;

public interface MovieService {
    List<AdminConfiguration> getAllMovies(AdminConfiguration moduleCategory);
}
