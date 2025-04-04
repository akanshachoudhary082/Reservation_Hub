package com.app.reservationbooking.service;

import com.app.reservationbooking.customexception.ResourceNotFoundException;
import com.app.reservationbooking.dto.ServiceDetailsDTO;

import java.util.List;

public interface ServiceDetailsService {

    List<ServiceDetailsDTO> getAllDetails();

    ServiceDetailsDTO getDetailsById(Long detailId) throws ResourceNotFoundException;

    ServiceDetailsDTO createDetails(ServiceDetailsDTO detailsDTO);

    ServiceDetailsDTO updateDetails(Long detailId, ServiceDetailsDTO detailsDTO) throws ResourceNotFoundException;

    void deleteDetails(Long detailId) throws ResourceNotFoundException;
}