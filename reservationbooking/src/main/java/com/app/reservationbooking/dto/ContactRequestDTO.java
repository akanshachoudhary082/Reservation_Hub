package com.app.reservationbooking.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ContactRequestDTO {

    private String full_name;

    private String email;

    private String mobile;

    private String category;

    private String message;


}
