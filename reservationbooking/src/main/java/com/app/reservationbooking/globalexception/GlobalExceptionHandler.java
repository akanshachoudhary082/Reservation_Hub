package com.app.reservationbooking.globalexception;

import com.app.reservationbooking.customexception.EmailServiceException;
import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.customexception.MovieNotFoundException;
import com.app.reservationbooking.customexception.MovieSeatsNotAvailableException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

/**
 * Global exception handler to catch and handle exceptions across the entire application.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles ResourceNotFoundException and returns a 404 NOT FOUND status with a detailed error message.
     *
     * @param ex      the thrown ResourceNotFoundException
     * @param request the current web request
     * @return ResponseEntity with error message and HTTP 404 status
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(),
                ex.getStackTrace()[0].getMethodName(),
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles MovieNotFoundException and returns a 404 NOT FOUND status with a detailed error message.
     *
     * @param ex      the thrown MovieNotFoundException
     * @param request the current web request
     * @return ResponseEntity with error message and HTTP 404 status
     */
    @ExceptionHandler(MovieNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleMovieNotFoundException(MovieNotFoundException ex, WebRequest request) {
        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(),
                ex.getStackTrace()[0].getMethodName(),
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles SeatNotAvailableException and returns a 404 NOT FOUND status with a detailed error message.
     *
     * @param ex      the thrown SeatNotAvailableException
     * @param request the current web request
     * @return ResponseEntity with error message and HTTP 404 status
     */
    @ExceptionHandler(MovieSeatsNotAvailableException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleSeatNotAvailableException(MovieSeatsNotAvailableException ex, WebRequest request) {
        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(),
                ex.getStackTrace()[0].getMethodName(),
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailServiceException.class)
    public ResponseEntity<String> handleEmailServiceException(EmailServiceException e) {
        log.error("Email service failed: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("There was an issue with sending the email. Please try again later.");
    }

    /**
     * Handles all other generic exceptions and returns a 500 INTERNAL SERVER ERROR status with a detailed error message.
     *
     * @param ex      the thrown Exception
     * @param request the current web request
     * @return ResponseEntity with error message and HTTP 500 status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception ex, WebRequest request) {
        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(),
                ex.getStackTrace()[0].getMethodName(),
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}