package com.app.reservationbooking.customexception;

public class MovieSeatsNotAvailableException extends RuntimeException{

    public MovieSeatsNotAvailableException(String message) {
        super(message);
    }
}
