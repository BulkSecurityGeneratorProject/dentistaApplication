package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.AnamnesisService;
import com.mycompany.myapp.domain.Anamnesis;
import com.mycompany.myapp.repository.AnamnesisRepository;
import com.mycompany.myapp.service.dto.AnamnesisDTO;
import com.mycompany.myapp.service.mapper.AnamnesisMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Anamnesis.
 */
@Service
@Transactional
public class AnamnesisServiceImpl implements AnamnesisService{

    private final Logger log = LoggerFactory.getLogger(AnamnesisServiceImpl.class);

    private final AnamnesisRepository anamnesisRepository;

    private final AnamnesisMapper anamnesisMapper;

    public AnamnesisServiceImpl(AnamnesisRepository anamnesisRepository, AnamnesisMapper anamnesisMapper) {
        this.anamnesisRepository = anamnesisRepository;
        this.anamnesisMapper = anamnesisMapper;
    }

    /**
     * Save a anamnesis.
     *
     * @param anamnesisDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AnamnesisDTO save(AnamnesisDTO anamnesisDTO) {
        log.debug("Request to save Anamnesis : {}", anamnesisDTO);
        Anamnesis anamnesis = anamnesisMapper.toEntity(anamnesisDTO);
        anamnesis = anamnesisRepository.save(anamnesis);
        return anamnesisMapper.toDto(anamnesis);
    }

    /**
     *  Get all the anamneses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AnamnesisDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Anamneses");
        return anamnesisRepository.findAll(pageable)
            .map(anamnesisMapper::toDto);
    }

    /**
     *  Get one anamnesis by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AnamnesisDTO findOne(Long id) {
        log.debug("Request to get Anamnesis : {}", id);
        Anamnesis anamnesis = anamnesisRepository.findOne(id);
        return anamnesisMapper.toDto(anamnesis);
    }

    /**
     *  Delete the  anamnesis by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Anamnesis : {}", id);
        anamnesisRepository.delete(id);
    }
}
