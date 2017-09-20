package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.AppointmentItemService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.AppointmentItemDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AppointmentItem.
 */
@RestController
@RequestMapping("/api")
public class AppointmentItemResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentItemResource.class);

    private static final String ENTITY_NAME = "appointmentItem";

    private final AppointmentItemService appointmentItemService;

    public AppointmentItemResource(AppointmentItemService appointmentItemService) {
        this.appointmentItemService = appointmentItemService;
    }

    /**
     * POST  /appointment-items : Create a new appointmentItem.
     *
     * @param appointmentItemDTO the appointmentItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appointmentItemDTO, or with status 400 (Bad Request) if the appointmentItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/appointment-items")
    @Timed
    public ResponseEntity<AppointmentItemDTO> createAppointmentItem(@RequestBody AppointmentItemDTO appointmentItemDTO) throws URISyntaxException {
        log.debug("REST request to save AppointmentItem : {}", appointmentItemDTO);
        if (appointmentItemDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new appointmentItem cannot already have an ID")).body(null);
        }
        AppointmentItemDTO result = appointmentItemService.save(appointmentItemDTO);
        return ResponseEntity.created(new URI("/api/appointment-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /appointment-items : Updates an existing appointmentItem.
     *
     * @param appointmentItemDTO the appointmentItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated appointmentItemDTO,
     * or with status 400 (Bad Request) if the appointmentItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the appointmentItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/appointment-items")
    @Timed
    public ResponseEntity<AppointmentItemDTO> updateAppointmentItem(@RequestBody AppointmentItemDTO appointmentItemDTO) throws URISyntaxException {
        log.debug("REST request to update AppointmentItem : {}", appointmentItemDTO);
        if (appointmentItemDTO.getId() == null) {
            return createAppointmentItem(appointmentItemDTO);
        }
        AppointmentItemDTO result = appointmentItemService.save(appointmentItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, appointmentItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /appointment-items : get all the appointmentItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of appointmentItems in body
     */
    @GetMapping("/appointment-items")
    @Timed
    public ResponseEntity<List<AppointmentItemDTO>> getAllAppointmentItems(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AppointmentItems");
        Page<AppointmentItemDTO> page = appointmentItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/appointment-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /appointment-items/:id : get the "id" appointmentItem.
     *
     * @param id the id of the appointmentItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the appointmentItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/appointment-items/{id}")
    @Timed
    public ResponseEntity<AppointmentItemDTO> getAppointmentItem(@PathVariable Long id) {
        log.debug("REST request to get AppointmentItem : {}", id);
        AppointmentItemDTO appointmentItemDTO = appointmentItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(appointmentItemDTO));
    }

    /**
     * DELETE  /appointment-items/:id : delete the "id" appointmentItem.
     *
     * @param id the id of the appointmentItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/appointment-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteAppointmentItem(@PathVariable Long id) {
        log.debug("REST request to delete AppointmentItem : {}", id);
        appointmentItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
