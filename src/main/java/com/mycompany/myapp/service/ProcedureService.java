package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.ProcedureDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Procedure.
 */
public interface ProcedureService {

    /**
     * Save a procedure.
     *
     * @param procedureDTO the entity to save
     * @return the persisted entity
     */
    ProcedureDTO save(ProcedureDTO procedureDTO);

    /**
     *  Get all the procedures.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ProcedureDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" procedure.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProcedureDTO findOne(Long id);

    /**
     *  Delete the "id" procedure.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
