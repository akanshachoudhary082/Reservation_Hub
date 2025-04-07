package com.app.reservationbooking.service;

import com.app.reservationbooking.dto.ServiceRecordDTO;
import com.app.reservationbooking.entities.ServiceDetails;
import com.app.reservationbooking.entities.ServiceRecord;
import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.repository.ServiceRecordRepository;
import com.app.reservationbooking.utility.ServiceRecordConverterUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRecordServiceImpl implements ServiceRecordService {

    @Autowired
    private ServiceRecordRepository serviceRecordRepository;

    @Override
    public List<ServiceRecordDTO> getAllServices() {
        List<ServiceRecord> services = serviceRecordRepository.findAll();
        return services.stream()
                .map(ServiceRecordConverterUtils::convertEntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceRecordDTO getServiceById(Long serviceRecordId) throws ResourceNotFoundException {
        ServiceRecord serviceRecord = serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id " + serviceRecordId));
        return ServiceRecordConverterUtils.convertEntityToDTO(serviceRecord);
    }

    @Override
    public ServiceRecordDTO createService(ServiceRecordDTO serviceRecordDTO) {
        ServiceRecord serviceRecord = ServiceRecordConverterUtils.convertToEntity(serviceRecordDTO);
        serviceRecord = serviceRecordRepository.save(serviceRecord);
        return ServiceRecordConverterUtils.convertEntityToDTO(serviceRecord);
    }

    @Override
    public ServiceRecordDTO updateService(Long serviceRecordId, ServiceRecordDTO serviceRecordDTO) throws ResourceNotFoundException {
        ServiceRecord existingService = serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id " + serviceRecordId));

        existingService.setServiceType(serviceRecordDTO.getServiceType());
        //existingService.setUser(serviceRecordDTO.getUser());
        existingService.setDetails((List<ServiceDetails>) serviceRecordDTO.getDetails());

        existingService = serviceRecordRepository.save(existingService);
        return ServiceRecordConverterUtils.convertEntityToDTO(existingService);
    }

    @Override
    public void deleteService(Long serviceRecordId) throws ResourceNotFoundException {
        serviceRecordRepository.findById(serviceRecordId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id " + serviceRecordId));
        serviceRecordRepository.deleteById(serviceRecordId);
    }
}
