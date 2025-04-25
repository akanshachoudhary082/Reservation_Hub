package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.SubServiceDetailsDTO;

import java.util.List;

/**
 * Service interface for managing service details operations.
 */
public interface SubServiceDetailsService {

    /**
     * Retrieves a list of all service details.
     *
     * @return a list of ServiceDetailsDTO objects
     */
    List<SubServiceDetailsDTO> getAllDetails();

    /**
     * Retrieves a service detail by its ID.
     *
     * @param detailId the ID of the service detail
     * @return the corresponding ServiceDetailsDTO
     * @throws ResourceNotFoundException if the detail with the given ID is not found
     */
    SubServiceDetailsDTO getDetailsById(Long detailId) throws ResourceNotFoundException;

    /**
     * Creates a new service detail record.
     *
     * @param detailsDTO the DTO containing the new service detail data
     * @return the saved ServiceDetailsDTO
     */
    SubServiceDetailsDTO createDetails(SubServiceDetailsDTO detailsDTO);

    /**
     * Updates an existing service detail by ID.
     *
     * @param detailId the ID of the detail to be updated
     * @param detailsDTO the new data for the service detail
     * @return the updated ServiceDetailsDTO
     * @throws ResourceNotFoundException if the detail with the given ID is not found
     */
    SubServiceDetailsDTO updateDetails(Long detailId, SubServiceDetailsDTO detailsDTO) throws ResourceNotFoundException;

    /**
     * Deletes a service detail by its ID.
     *
     * @param detailId the ID of the service detail to be deleted
     * @throws ResourceNotFoundException if the detail with the given ID is not found
     */
    void deleteDetails(Long detailId) throws ResourceNotFoundException;
}
