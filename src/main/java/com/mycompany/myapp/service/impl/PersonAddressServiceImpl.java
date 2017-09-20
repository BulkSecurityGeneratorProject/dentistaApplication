package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.PersonAddressService;
import com.mycompany.myapp.domain.PersonAddress;
import com.mycompany.myapp.repository.PersonAddressRepository;
import com.mycompany.myapp.service.dto.PersonAddressDTO;
import com.mycompany.myapp.service.mapper.PersonAddressMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PersonAddress.
 */
@Service
@Transactional
public class PersonAddressServiceImpl implements PersonAddressService{

    private final Logger log = LoggerFactory.getLogger(PersonAddressServiceImpl.class);

    private final PersonAddressRepository personAddressRepository;

    private final PersonAddressMapper personAddressMapper;

    public PersonAddressServiceImpl(PersonAddressRepository personAddressRepository, PersonAddressMapper personAddressMapper) {
        this.personAddressRepository = personAddressRepository;
        this.personAddressMapper = personAddressMapper;
    }

    /**
     * Save a personAddress.
     *
     * @param personAddressDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonAddressDTO save(PersonAddressDTO personAddressDTO) {
        log.debug("Request to save PersonAddress : {}", personAddressDTO);
        PersonAddress personAddress = personAddressMapper.toEntity(personAddressDTO);
        personAddress = personAddressRepository.save(personAddress);
        return personAddressMapper.toDto(personAddress);
    }

    /**
     *  Get all the personAddresses.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonAddressDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PersonAddresses");
        return personAddressRepository.findAll(pageable)
            .map(personAddressMapper::toDto);
    }

    /**
     *  Get one personAddress by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PersonAddressDTO findOne(Long id) {
        log.debug("Request to get PersonAddress : {}", id);
        PersonAddress personAddress = personAddressRepository.findOne(id);
        return personAddressMapper.toDto(personAddress);
    }

    /**
     *  Delete the  personAddress by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonAddress : {}", id);
        personAddressRepository.delete(id);
    }
}
