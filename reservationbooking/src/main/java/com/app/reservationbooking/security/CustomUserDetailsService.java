package com.app.reservationbooking.security;

import com.app.reservationbooking.entities.User;
import com.app.reservationbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // invoke dao's method
        User user = userRepo.findByUserEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found !!!!!"));
        return new CustomUserDetails(user);
    }

}
