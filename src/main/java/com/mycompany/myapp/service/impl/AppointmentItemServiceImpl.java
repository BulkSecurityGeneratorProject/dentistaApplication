package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.AppointmentItemService;
import com.mycompany.myapp.domain.AppointmentItem;
import com.mycompany.myapp.repository.AppointmentItemRepository;
import com.mycompany.myapp.service.dto.AppointmentItemDTO;
import com.mycompany.myapp.service.mapper.AppointmentItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AppointmentItem.
 */
@Service
@Transactional
public class AppointmentItemServiceImpl implements AppointmentItemService{

    private final Logger log = LoggerFactory.getLogger(AppointmentItemServiceImpl.class);

    private final AppointmentItemRepository appointmentItemRepository;

    private final AppointmentItemMapper appointmentItemMapper;

    public AppointmentItemServiceImpl(AppointmentItemRepository appointmentItemRepository, AppointmentItemMapper appointmentItemMapper) {
        this.appointmentItemRepository = appointmentItemRepository;
        this.appointmentItemMapper = appointmentItemMapper;
    }

    /**
     * Save a appointmentItem.
     *
     * @param appointmentItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AppointmentItemDTO save(AppointmentItemDTO appointmentItemDTO) {
        log.debug("Request to save AppointmentItem : {}", appointmentItemDTO);
        AppointmentItem appointmentItem = appointmentItemMapper.toEntity(appointmentItemDTO);
        appointmentItem = appointmentItemRepository.save(appointmentItem);
        return appointmentItemMapper.toDto(appointmentItem);
    }

    /**
     *  Get all the appointmentItems.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AppointmentItems");
        return appointmentItemRepository.findAll(pageable)
            .map(appointmentItemMapper::toDto);
    }

    /**
     *  Get one appointmentItem by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AppointmentItemDTO findOne(Long id) {
        log.debug("Request to get AppointmentItem : {}", id);
        AppointmentItem appointmentItem = appointmentItemRepository.findOne(id);
        return appointmentItemMapper.toDto(appointmentItem);
    }

    /**
     *  Delete the  appointmentItem by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AppointmentItem : {}", id);
        appointmentItemRepository.delete(id);
    }
}
