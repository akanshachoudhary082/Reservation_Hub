package com.app.reservationbooking.customexception;

public class EventSeatsNotAvailableException extends RuntimeException{

    public EventSeatsNotAvailableException(String message) {
        super(message);
    }
}
