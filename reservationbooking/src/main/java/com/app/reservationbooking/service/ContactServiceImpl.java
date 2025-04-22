package com.app.reservationbooking.service;
//
//import com.app.reservationbooking.customexception.EmailServiceException; // Custom exception
//import com.app.reservationbooking.dto.ContactRequestDTO;
//import com.app.reservationbooking.configs.ContactJSConfig;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class ContactServiceImpl implements ContactService {
//
//    @Autowired
//    private ContactJSConfig config;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    @Override
//    public void sendEmail(ContactRequestDTO contactRequestDTO) {
//        String url = "https://api.emailjs.com/api/v1.0/email/send";
//
//        // Prepare the request body
//        Map<String, Object> body = new HashMap<>();
//        body.put("service_id", config.getServiceId());
//        body.put("template_id", config.getTemplateId());
//        body.put("user_id", config.getPublicKey());
//
//        // Template parameters from ContactRequestDTO
//        Map<String, String> params = new HashMap<>();
//        params.put("full_name", contactRequestDTO.getFull_name());
//        params.put("email", contactRequestDTO.getEmail());
//        params.put("mobile", contactRequestDTO.getMobile());
//        params.put("category", contactRequestDTO.getCategory());
//        params.put("message", contactRequestDTO.getMessage());
//
//        body.put("template_params", params);
//
//        // Set the headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
//
//        try {
//            // Send the request to EmailJS API
//            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
//
//            // Check if the response is successful
//            if (!response.getStatusCode().is2xxSuccessful()) {
//                throw new EmailServiceException("EmailJS failed: " + response.getBody());
//            }
//        } catch (Exception e) {
//            // Log the exception
//            throw new EmailServiceException("Error sending email: " + e.getMessage(), e);
//        }
//    }
//}

import com.app.reservationbooking.configs.ContactJSConfig;
import com.app.reservationbooking.customexception.EmailServiceException;
import com.app.reservationbooking.dto.ContactRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class ContactServiceImpl implements ContactService {

   // private static final Logger logger = LoggerFactory.getLogger(ContactServiceImpl.class);

    @Autowired
    private ContactJSConfig config;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public void sendEmail(ContactRequestDTO contactRequestDTO) {
        String url = "https://api.emailjs.com/api/v1.0/email/send";

        log.info("Sending email to EmailJS service...");

        // Prepare the request body
        Map<String, Object> body = new HashMap<>();
        body.put("service_id", config.getServiceId());
        body.put("template_id", config.getTemplateId());
        body.put("public_key", config.getPublicKey());

        // Template parameters from ContactRequestDTO
        Map<String, String> params = new HashMap<>();
        params.put("full_name", contactRequestDTO.getFull_name());
        params.put("email", contactRequestDTO.getEmail());
        params.put("mobile", contactRequestDTO.getMobile());
        params.put("category", contactRequestDTO.getCategory());
        params.put("message", contactRequestDTO.getMessage());

        body.put("template_params", params);

        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            // Send the request to EmailJS API
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            log.info("Email sent successfully with response: " + response.getBody());

            // Check if the response is successful
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new EmailServiceException("EmailJS failed: " + response.getBody());
            }
        } catch (Exception e) {
            // Log the exception
            log.error("Error sending email", e);
            throw new EmailServiceException("Error sending email: " + e.getMessage(), e);
        }
    }
}
