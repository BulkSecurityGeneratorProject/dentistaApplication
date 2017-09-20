package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.FinancialMoveService;
import com.mycompany.myapp.domain.FinancialMove;
import com.mycompany.myapp.repository.FinancialMoveRepository;
import com.mycompany.myapp.service.dto.FinancialMoveDTO;
import com.mycompany.myapp.service.mapper.FinancialMoveMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing FinancialMove.
 */
@Service
@Transactional
public class FinancialMoveServiceImpl implements FinancialMoveService{

    private final Logger log = LoggerFactory.getLogger(FinancialMoveServiceImpl.class);

    private final FinancialMoveRepository financialMoveRepository;

    private final FinancialMoveMapper financialMoveMapper;

    public FinancialMoveServiceImpl(FinancialMoveRepository financialMoveRepository, FinancialMoveMapper financialMoveMapper) {
        this.financialMoveRepository = financialMoveRepository;
        this.financialMoveMapper = financialMoveMapper;
    }

    /**
     * Save a financialMove.
     *
     * @param financialMoveDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FinancialMoveDTO save(FinancialMoveDTO financialMoveDTO) {
        log.debug("Request to save FinancialMove : {}", financialMoveDTO);
        FinancialMove financialMove = financialMoveMapper.toEntity(financialMoveDTO);
        financialMove = financialMoveRepository.save(financialMove);
        return financialMoveMapper.toDto(financialMove);
    }

    /**
     *  Get all the financialMoves.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FinancialMoveDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FinancialMoves");
        return financialMoveRepository.findAll(pageable)
            .map(financialMoveMapper::toDto);
    }

    /**
     *  Get one financialMove by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FinancialMoveDTO findOne(Long id) {
        log.debug("Request to get FinancialMove : {}", id);
        FinancialMove financialMove = financialMoveRepository.findOne(id);
        return financialMoveMapper.toDto(financialMove);
    }

    /**
     *  Delete the  financialMove by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FinancialMove : {}", id);
        financialMoveRepository.delete(id);
    }
}
