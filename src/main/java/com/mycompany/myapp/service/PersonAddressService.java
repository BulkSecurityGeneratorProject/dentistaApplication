package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.PersonAddressDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PersonAddress.
 */
public interface PersonAddressService {

    /**
     * Save a personAddress.
     *
     * @param personAddressDTO the entity to save
     * @return the persisted entity
     */
    PersonAddressDTO save(PersonAddressDTO personAddressDTO);

    /**
     *  Get all the personAddresses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PersonAddressDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" personAddress.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PersonAddressDTO findOne(Long id);

    /**
     *  Delete the "id" personAddress.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
