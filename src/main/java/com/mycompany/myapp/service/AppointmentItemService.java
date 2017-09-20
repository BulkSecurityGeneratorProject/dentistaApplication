package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.AppointmentItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing AppointmentItem.
 */
public interface AppointmentItemService {

    /**
     * Save a appointmentItem.
     *
     * @param appointmentItemDTO the entity to save
     * @return the persisted entity
     */
    AppointmentItemDTO save(AppointmentItemDTO appointmentItemDTO);

    /**
     *  Get all the appointmentItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<AppointmentItemDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" appointmentItem.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AppointmentItemDTO findOne(Long id);

    /**
     *  Delete the "id" appointmentItem.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
