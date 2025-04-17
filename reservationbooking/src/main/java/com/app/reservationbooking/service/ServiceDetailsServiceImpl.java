package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.ServiceDetailsDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.repository.ServiceDetailsRepository;
import com.app.reservationbooking.repository.ServiceRecordRepository;
import com.app.reservationbooking.utility.ServiceDetailsConverterUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ServiceDetailsServiceImpl implements ServiceDetailsService {

    @Autowired
    private ServiceDetailsRepository detailsRepository;

    @Autowired
    private ServiceRecordRepository serviceRecordRepository;

    /**
     * Retrieves all service details records from the database.
     *
     * @return List of ServiceDetailsDTO objects.
     */
    @Override
    public List<ServiceDetailsDTO> getAllDetails() {
        log.info("Fetching all service details records");
        List<ServiceDetails> details = detailsRepository.findAll();
        return details.stream()
                .map(ServiceDetailsConverterUtils::convertEntityToDTO)  // Convert each Details entity to DTO
                .collect(Collectors.toList());
    }

    /**
     * Retrieves service details by ID.
     *
     * @param detailId ID of the service detail.
     * @return Corresponding ServiceDetailsDTO.
     * @throws ResourceNotFoundException if the service detail is not found.
     */
    @Override
    public ServiceDetailsDTO getDetailsById(Long detailId) throws ResourceNotFoundException {
        // Log first, then throw exception if not found
        ServiceDetails details = detailsRepository.findById(detailId)
                .orElseThrow(() -> {
                    log.error("Details not found with id: {}", detailId);
                    return new ResourceNotFoundException("Details not found with id " + detailId);
                });

        log.info("Fetching service detail with ID: {}", detailId);
        return ServiceDetailsConverterUtils.convertEntityToDTO(details);  // Convert entity to DTO
    }

    /**
     * Creates a new service detail record in the database.
     *
     * @param detailsDTO DTO containing service detail information.
     * @return Created ServiceDetailsDTO.
     * @throws IllegalArgumentException if the serviceId is null.
     * @throws ResourceNotFoundException if the associated ServiceRecord is not found.
     */
    @Override
    public ServiceDetailsDTO createDetails(ServiceDetailsDTO detailsDTO) {
        if (detailsDTO.getServiceId() == null) {
            log.error("serviceId cannot be null");
            throw new IllegalArgumentException("serviceId cannot be null");
        }

        log.info("Creating service detail with serviceId: {}", detailsDTO.getServiceId());

        ServiceRecord serviceRecord = serviceRecordRepository.findById(detailsDTO.getServiceId())
                .orElseThrow(() -> {
                    log.error("ServiceRecord not found with id: {}", detailsDTO.getServiceId());
                    return new ResourceNotFoundException("ServiceRecord not found with id " + detailsDTO.getServiceId());
                });

        ServiceDetails details = ServiceDetailsConverterUtils.convertToEntity(detailsDTO);
        details.setServices(serviceRecord);  // Link the ServiceRecord

        details = detailsRepository.save(details);  // Save to database
        log.info("Created service detail with ID: {}", details.getDetailId());

        return ServiceDetailsConverterUtils.convertEntityToDTO(details);  // Return as DTO
    }

    /**
     * Updates an existing service detail record.
     *
     * @param detailId ID of the service detail to update.
     * @param detailsDTO DTO containing updated data.
     * @return Updated ServiceDetailsDTO.
     * @throws ResourceNotFoundException if the service detail is not found.
     */
    @Override
    public ServiceDetailsDTO updateDetails(Long detailId, ServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
        log.info("Updating service detail with ID: {}", detailId);

        ServiceDetails existingDetails = detailsRepository.findById(detailId)
                .orElseThrow(() -> {
                    log.error("Details not found with id: {}", detailId);
                    return new ResourceNotFoundException("Details not found with id " + detailId);
                });

        if (detailsDTO.getDetailType() != null) {
            existingDetails.setDetailType(detailsDTO.getDetailType());
            log.info("Updated detailType for service detail ID: {}", detailId);
        }

        existingDetails = detailsRepository.save(existingDetails);  // Save updated details
        log.info("Updated service detail with ID: {}", detailId);

        return ServiceDetailsConverterUtils.convertEntityToDTO(existingDetails);
    }

    /**
     * Deletes a service detail by ID.
     *
     * @param detailId ID of the service detail to delete.
     * @throws ResourceNotFoundException if the service detail is not found.
     */
    @Override
    public void deleteDetails(Long detailId) throws ResourceNotFoundException {
        log.info("Deleting service detail with ID: {}", detailId);

        ServiceDetails existingDetails = detailsRepository.findById(detailId)
                .orElseThrow(() -> {
                    log.error("Details not found with id: {}", detailId);
                    return new ResourceNotFoundException("Details not found with id: " + detailId);
                });

        detailsRepository.deleteById(detailId);  // Delete the details from the repository
        log.info("Deleted service detail with ID: {}", detailId);
    }
}
