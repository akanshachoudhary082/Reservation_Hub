package com.app.reservationbooking.repository;

import com.app.reservationbooking.entities.SubServiceDetails;
import com.app.reservationbooking.entities.MainServiceRecord;
import com.app.reservationbooking.enums.MainServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for accessing ServiceRecord data from the database.
 */
@Repository
public interface MainServiceRecordRepository extends JpaRepository<MainServiceRecord, Long> {

    /**
     * Finds a ServiceRecord by its service type and associated ServiceDetails ID.
     *
     * @param serviceType The type of the service (e.g., Bus, Train).
     * @param details The unique ID of the associated ServiceDetails.
     * @return An Optional containing the matching ServiceRecord, or empty if none found.
     */

    Optional<MainServiceRecord> findByServiceTypeAndDetails(MainServiceType serviceType, SubServiceDetails details);
}
