package com.app.reservationbooking.gobalexception;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request){

        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(),
                ex.getStackTrace()[0].getMethodName(),
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception ex, WebRequest request) {

        String errorMessage = String.format("Error in %s at %s: %s",
                ex.getStackTrace()[0].getClassName(), // Class name
                ex.getStackTrace()[0].getMethodName(), // Method name
                ex.getMessage());

        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
