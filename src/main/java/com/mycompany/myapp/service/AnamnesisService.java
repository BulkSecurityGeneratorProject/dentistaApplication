package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.AnamnesisDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Anamnesis.
 */
public interface AnamnesisService {

    /**
     * Save a anamnesis.
     *
     * @param anamnesisDTO the entity to save
     * @return the persisted entity
     */
    AnamnesisDTO save(AnamnesisDTO anamnesisDTO);

    /**
     *  Get all the anamneses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<AnamnesisDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" anamnesis.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AnamnesisDTO findOne(Long id);

    /**
     *  Delete the "id" anamnesis.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
