package com.app.reservationbooking.dto;

import com.app.reservationbooking.entities.BaseEntity;
import com.app.reservationbooking.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserRespDTO extends BaseEntity {

    private Long userId;

    private String firstName;

    private String lastName;

    private String mobileNumber;

    private String userEmail;

    private Role role;

    private String password;

    private String countryCode;

}
