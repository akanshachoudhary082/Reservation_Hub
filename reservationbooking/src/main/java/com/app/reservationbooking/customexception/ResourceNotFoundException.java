package com.app.reservationbooking.customexception;

public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructor with both message and cause parameters.
     *
     * @param message The detail message about the exception.
     * @param cause   The underlying cause of the exception.
     */
    public ResourceNotFoundException(String message, Throwable cause){
        super(message, cause);
    }

    /**
     * Constructor with just the message parameter.
     *
     * @param message The detail message about the exception.
     */
    public ResourceNotFoundException(String message){
        super(message);
    }


}
