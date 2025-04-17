package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.repository.ServiceRecordRepository;
import com.app.reservationbooking.utility.ServiceRecordConverterUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service implementation for handling operations related to ServiceRecord.
 */
@Slf4j
@Service
public class ServiceRecordServiceImpl implements ServiceRecordService {

    @Autowired
    private ServiceRecordRepository serviceRecordRepository;

    /**
     * Retrieves all available service records.
     *
     * @return List of ServiceRecordDTO representing all service records.
     */
    @Override
    public List<ServiceRecordDTO> getAllServices() {
        log.debug("Fetching all service records from the database.");
        List<ServiceRecord> services = serviceRecordRepository.findAll();
        if (services.isEmpty()) {
            log.warn("No service records found in the database.");
        } else {
            log.info("Successfully fetched {} service records.", services.size());
        }
        return services.stream()
                .map(ServiceRecordConverterUtils::convertEntityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a specific service record by its ID.
     *
     * @param serviceRecordId ID of the service record.
     * @return ServiceRecordDTO representing the service record with the given ID.
     * @throws ResourceNotFoundException if no service record is found with the provided ID.
     */
    @Override
    public ServiceRecordDTO getServiceById(Long serviceRecordId) throws ResourceNotFoundException {
        log.debug("Fetching service record with ID: {}", serviceRecordId);
        ServiceRecord serviceRecord = serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> {
                    log.error("Service record not found with id: {}", serviceRecordId);
                    return new ResourceNotFoundException("Service not found with id " + serviceRecordId);
                });
        log.info("Service record with ID {} found successfully.", serviceRecordId);
        return ServiceRecordConverterUtils.convertEntityToDTO(serviceRecord);
    }


    /**
     * Creates a new service record based on the given DTO.
     *
     * @param serviceRecordDTO DTO containing details of the service to be created.
     * @return The created ServiceRecordDTO.
     */
    @Override
    public ServiceRecordDTO createService(ServiceRecordDTO serviceRecordDTO) {
        log.debug("Creating a new service record with type: {}", serviceRecordDTO.getServiceType());

        // Check for duplicate service record (you can modify this check as needed)
        Optional<ServiceRecord> existingService = serviceRecordRepository.findByServiceTypeAndDetails(
                serviceRecordDTO.getServiceType(),
                serviceRecordDTO.getDetails());  // Assuming serviceRecordDTO contains enough fields for duplication check

        if (existingService.isPresent()) {
            log.warn("Duplicate service record found. Skipping creation for service type: {}.", serviceRecordDTO.getServiceType());
            return ServiceRecordConverterUtils.convertEntityToDTO(existingService.get());
        }

        ServiceRecord serviceRecord = ServiceRecordConverterUtils.convertToEntity(serviceRecordDTO);
        serviceRecord = serviceRecordRepository.save(serviceRecord);
        log.info("Service record created with ID: {}", serviceRecord.getServiceRecordId());
        return ServiceRecordConverterUtils.convertEntityToDTO(serviceRecord);
    }

    /**
     * Updates an existing service record with the provided details.
     *
     * @param serviceRecordId ID of the service record to update.
     * @param serviceRecordDTO DTO containing updated data.
     * @return The updated ServiceRecordDTO.
     * @throws ResourceNotFoundException if the service record is not found.
     */
    @Override
    public ServiceRecordDTO updateService(Long serviceRecordId, ServiceRecordDTO serviceRecordDTO) throws ResourceNotFoundException {
        log.debug("Attempting to update service record with ID: {}", serviceRecordId);
        ServiceRecord existingService = serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> {
                    log.error("Service record not found with id: {}", serviceRecordId);
                    return new ResourceNotFoundException("Service not found with id " + serviceRecordId);
                });

        existingService.setServiceType(serviceRecordDTO.getServiceType());
        existingService.setDetails((List<ServiceDetails>) serviceRecordDTO.getDetails());

        existingService = serviceRecordRepository.save(existingService);
        log.info("Service record with ID {} updated successfully.", serviceRecordId);
        return ServiceRecordConverterUtils.convertEntityToDTO(existingService);
    }

    /**
     * Deletes a service record by its ID.
     *
     * @param serviceRecordId ID of the service record to be deleted.
     * @throws ResourceNotFoundException if the service record is not found.
     */
    @Override
    public void deleteService(Long serviceRecordId) throws ResourceNotFoundException {
        log.debug("Attempting to delete service record with ID: {}", serviceRecordId);
        ServiceRecord existingService = serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> {
                    return new ResourceNotFoundException("Service not found with id " + serviceRecordId);
                });
        serviceRecordRepository.deleteById(serviceRecordId);
        log.info("Service record with ID {} deleted successfully.", serviceRecordId);
    }
}
