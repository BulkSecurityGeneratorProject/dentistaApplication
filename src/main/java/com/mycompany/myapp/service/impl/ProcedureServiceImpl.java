package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ProcedureService;
import com.mycompany.myapp.domain.Procedure;
import com.mycompany.myapp.repository.ProcedureRepository;
import com.mycompany.myapp.service.dto.ProcedureDTO;
import com.mycompany.myapp.service.mapper.ProcedureMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Procedure.
 */
@Service
@Transactional
public class ProcedureServiceImpl implements ProcedureService{

    private final Logger log = LoggerFactory.getLogger(ProcedureServiceImpl.class);

    private final ProcedureRepository procedureRepository;

    private final ProcedureMapper procedureMapper;

    public ProcedureServiceImpl(ProcedureRepository procedureRepository, ProcedureMapper procedureMapper) {
        this.procedureRepository = procedureRepository;
        this.procedureMapper = procedureMapper;
    }

    /**
     * Save a procedure.
     *
     * @param procedureDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProcedureDTO save(ProcedureDTO procedureDTO) {
        log.debug("Request to save Procedure : {}", procedureDTO);
        Procedure procedure = procedureMapper.toEntity(procedureDTO);
        procedure = procedureRepository.save(procedure);
        return procedureMapper.toDto(procedure);
    }

    /**
     *  Get all the procedures.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProcedureDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Procedures");
        return procedureRepository.findAll(pageable)
            .map(procedureMapper::toDto);
    }

    /**
     *  Get one procedure by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProcedureDTO findOne(Long id) {
        log.debug("Request to get Procedure : {}", id);
        Procedure procedure = procedureRepository.findOne(id);
        return procedureMapper.toDto(procedure);
    }

    /**
     *  Delete the  procedure by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Procedure : {}", id);
        procedureRepository.delete(id);
    }
}
