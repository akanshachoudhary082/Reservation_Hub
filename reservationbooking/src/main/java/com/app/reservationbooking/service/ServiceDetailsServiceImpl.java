
package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.ServiceDetailsDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.repository.ServiceDetailsRepository;
import com.app.reservationbooking.repository.ServiceRecordRepository;
import com.app.reservationbooking.utility.ServiceDetailsConverterUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceDetailsServiceImpl implements ServiceDetailsService {

    @Autowired
    private ServiceDetailsRepository detailsRepository;

    @Autowired
    private ServiceRecordRepository serviceRecordRepository;

    @Override
    public List<ServiceDetailsDTO> getAllDetails() {
        List<ServiceDetails> details = detailsRepository.findAll();
        return details.stream()
                .map(ServiceDetailsConverterUtils::convertEntityToDTO)  // Convert each Details entity to DTO
                .collect(Collectors.toList());
    }

    @Override
    public ServiceDetailsDTO getDetailsById(Long detailId) throws ResourceNotFoundException {
        ServiceDetails details = detailsRepository.findById(detailId)
                .orElseThrow(() -> new ResourceNotFoundException("Details not found with id " + detailId));
        return ServiceDetailsConverterUtils.convertEntityToDTO(details);  // Convert entity to DTO
    }

    // Create new details
//    @Override
//    public ServiceDetailsDTO createDetails(ServiceDetailsDTO detailsDTO) {
//        ServiceDetails details = ServiceDetailsConverterUtils.convertToEntity(detailsDTO);
//        details = detailsRepository.save(details);
//        return ServiceDetailsConverterUtils.convertEntityToDTO(details);
//    }

    @Override
    public ServiceDetailsDTO createDetails(ServiceDetailsDTO detailsDTO) {

        if (detailsDTO.getServiceId() == null) {
            throw new IllegalArgumentException("serviceId cannot be null");
        }

        ServiceRecord serviceRecord = serviceRecordRepository.findById(detailsDTO.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("ServiceRecord not found with id " + detailsDTO.getServiceId()));

        ServiceDetails details = ServiceDetailsConverterUtils.convertToEntity(detailsDTO);

        details.setServices(serviceRecord);

        details = detailsRepository.save(details);

        return ServiceDetailsConverterUtils.convertEntityToDTO(details);
    }



    @Override
    public ServiceDetailsDTO updateDetails(Long detailId, ServiceDetailsDTO detailsDTO) throws ResourceNotFoundException {
        ServiceDetails existingDetails = detailsRepository.findById(detailId)
                .orElseThrow(() -> new ResourceNotFoundException("Details not found with id " + detailId));

        if (detailsDTO.getDetailType() != null) {
            existingDetails.setDetailType(detailsDTO.getDetailType());
        }
        existingDetails = detailsRepository.save(existingDetails);

        return ServiceDetailsConverterUtils.convertEntityToDTO(existingDetails);
    }


    @Override
    public void deleteDetails(Long detailId) throws ResourceNotFoundException {
        detailsRepository.findById(detailId)
                .orElseThrow(() -> new ResourceNotFoundException("Details not found with id: " + detailId));
        detailsRepository.deleteById(detailId);
    }

}
