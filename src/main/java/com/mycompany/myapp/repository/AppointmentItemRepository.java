package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AppointmentItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AppointmentItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppointmentItemRepository extends JpaRepository<AppointmentItem, Long> {

}
