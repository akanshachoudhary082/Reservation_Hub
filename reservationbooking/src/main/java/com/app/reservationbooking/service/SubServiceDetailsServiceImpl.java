package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.SubServiceDetailsDTO;
import com.app.reservationbooking.entities.SubServiceDetails;
import com.app.reservationbooking.entities.MainServiceRecord;
import com.app.reservationbooking.repository.SubServiceDetailsRepository;
import com.app.reservationbooking.repository.MainServiceRecordRepository;
import com.app.reservationbooking.utility.SubServiceDetailsConverterUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SubServiceDetailsServiceImpl implements SubServiceDetailsService {

    @Autowired
    private SubServiceDetailsRepository detailsRepository;

    @Autowired
    private MainServiceRecordRepository serviceRecordRepository;

    /**
     * Retrieves all service details records from the database.
     *
     * @return List of ServiceDetailsDTO objects.
     */
    @Override
    public List<SubServiceDetailsDTO> getAllDetails() {
        log.info("Fetching all service details records");
        List<SubServiceDetails> details = detailsRepository.findAll();
        return details.stream()
                .map(SubServiceDetailsConverterUtils::convertEntityToDTO)  // Convert each Details entity to DTO
                .collect(Collectors.toList());
    }

    /**
     * Retrieves service details by ID.
     *
     * @param detailId ID of the service detail.
     * @return Corresponding ServiceDetailsDTO.
     * @throws ResourceNotFoundException if the service detail is not found.
     */
    @Transactional
    @Override
    public SubServiceDetailsDTO getDetailsById(Long detailId) throws ResourceNotFoundException {
        // Log first, then throw exception if not found
        SubServiceDetails details = detailsRepository.findById(detailId)
                .orElseThrow(() -> {
                    log.error("Details not found with id: {}", detailId);
                    return new ResourceNotFoundException("Details not found with id " + detailId);
                });

        log.info("Fetching service detail with ID: {}", detailId);
        return SubServiceDetailsConverterUtils.convertEntityToDTO(details);  // Convert entity to DTO
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
    public SubServiceDetailsDTO createDetails(SubServiceDetailsDTO detailsDTO) {
        if (detailsDTO.getServiceId() == null) {
            log.error("serviceId cannot be null");
            throw new IllegalArgumentException("serviceId cannot be null");
        }

        log.info("Creating service detail with serviceId: {}", detailsDTO.getServiceId());

        MainServiceRecord serviceRecord = serviceRecordRepository.findById(detailsDTO.getServiceId())
                .orElseThrow(() -> {
                    log.error("ServiceRecord not found with id: {}", detailsDTO.getServiceId());
                    return new ResourceNotFoundException("ServiceRecord not found with id " + detailsDTO.getServiceId());
                });

        SubServiceDetails details = SubServiceDetailsConverterUtils.convertToEntity(detailsDTO);
        details.setServices(serviceRecord);  // Link the ServiceRecord

        details = detailsRepository.save(details);  // Save to database
        log.info("Created service detail with ID: {}", details.getDetailId());

        return SubServiceDetailsConverterUtils.convertEntityToDTO(details);  // Return as DTO
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
    public SubServiceDetailsDTO updateDetails(Long detailId, SubServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
        log.info("Updating service detail with ID: {}", detailId);

        SubServiceDetails existingDetails = detailsRepository.findById(detailId)
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

        return SubServiceDetailsConverterUtils.convertEntityToDTO(existingDetails);
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

        SubServiceDetails existingDetails = detailsRepository.findById(detailId)
                .orElseThrow(() -> {
                    log.error("Details not found with id: {}", detailId);
                    return new ResourceNotFoundException("Details not found with id: " + detailId);
                });

        detailsRepository.deleteById(detailId);  // Delete the details from the repository
        log.info("Deleted service detail with ID: {}", detailId);
    }
}
