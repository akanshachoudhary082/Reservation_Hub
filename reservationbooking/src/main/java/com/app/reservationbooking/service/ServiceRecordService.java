package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.entities.ServiceRecord;

import java.util.List;

/**
 * Service interface for handling operations related to ServiceRecord.
 */
public interface ServiceRecordService {

    /**
     * Retrieves a list of all service records.
     *
     * @return List of ServiceRecordDTO representing all available service records.
     */
    List<ServiceRecordDTO> getAllServices();

    public List<ServiceRecord> getAllServiceRecords();
    /**
     * Retrieves a specific service record by its ID.
     *
     * @param serviceRecordId ID of the service record.
     * @return ServiceRecordDTO corresponding to the given ID.
     * @throws ResourceNotFoundException if no service record is found with the provided ID.
     */
    ServiceRecordDTO getServiceById(Long serviceRecordId);

    /**
     * Creates a new service record based on the given DTO.
     *
     * @param serviceRecordDTO DTO containing details of the service to be created.
     * @return The created ServiceRecordDTO.
     */
    ServiceRecordDTO createService(ServiceRecordDTO serviceRecordDTO);

    /**
     * Updates an existing service record.
     *
     * @param serviceRecordId ID of the service record to update.
     * @param serviceRecordDTO DTO containing updated data.
     * @return The updated ServiceRecordDTO.
     * @throws ResourceNotFoundException if the service record is not found.
     */
    ServiceRecordDTO updateService(Long serviceRecordId, ServiceRecordDTO serviceRecordDTO);

    /**
     * Deletes a service record by its ID.
     *
     * @param serviceRecordId ID of the service record to be deleted.
     * @throws ResourceNotFoundException if the service record is not found.
     */
    void deleteService(Long serviceRecordId);
}
