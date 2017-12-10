package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.FinancialMoveDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing FinancialMove.
 */
public interface FinancialMoveService {

    /**
     * Save a financialMove.
     *
     * @param financialMoveDTO the entity to save
     * @return the persisted entity
     */
    FinancialMoveDTO save(FinancialMoveDTO financialMoveDTO);

    /**
     *  Get all the financialMoves.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<FinancialMoveDTO> findAll(Pageable pageable);

    /**
     *  Get last balance
     *
     *  @return optional entity
     */
    Optional<FinancialMoveDTO> findTopByCurrentBalanceIsNotNullOrderByMoveDateDesc();

    /**
     *  Get the "id" financialMove.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    FinancialMoveDTO findOne(Long id);

    /**
     *  Delete the "id" financialMove.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
