package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.AnamnesisService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.AnamnesisDTO;
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
 * REST controller for managing Anamnesis.
 */
@RestController
@RequestMapping("/api")
public class AnamnesisResource {

    private final Logger log = LoggerFactory.getLogger(AnamnesisResource.class);

    private static final String ENTITY_NAME = "anamnesis";

    private final AnamnesisService anamnesisService;

    public AnamnesisResource(AnamnesisService anamnesisService) {
        this.anamnesisService = anamnesisService;
    }

    /**
     * POST  /anamneses : Create a new anamnesis.
     *
     * @param anamnesisDTO the anamnesisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new anamnesisDTO, or with status 400 (Bad Request) if the anamnesis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/anamneses")
    @Timed
    public ResponseEntity<AnamnesisDTO> createAnamnesis(@RequestBody AnamnesisDTO anamnesisDTO) throws URISyntaxException {
        log.debug("REST request to save Anamnesis : {}", anamnesisDTO);
        if (anamnesisDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new anamnesis cannot already have an ID")).body(null);
        }
        AnamnesisDTO result = anamnesisService.save(anamnesisDTO);
        return ResponseEntity.created(new URI("/api/anamneses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /anamneses : Updates an existing anamnesis.
     *
     * @param anamnesisDTO the anamnesisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated anamnesisDTO,
     * or with status 400 (Bad Request) if the anamnesisDTO is not valid,
     * or with status 500 (Internal Server Error) if the anamnesisDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/anamneses")
    @Timed
    public ResponseEntity<AnamnesisDTO> updateAnamnesis(@RequestBody AnamnesisDTO anamnesisDTO) throws URISyntaxException {
        log.debug("REST request to update Anamnesis : {}", anamnesisDTO);
        if (anamnesisDTO.getId() == null) {
            return createAnamnesis(anamnesisDTO);
        }
        AnamnesisDTO result = anamnesisService.save(anamnesisDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, anamnesisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /anamneses : get all the anamneses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of anamneses in body
     */
    @GetMapping("/anamneses")
    @Timed
    public ResponseEntity<List<AnamnesisDTO>> getAllAnamneses(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Anamneses");
        Page<AnamnesisDTO> page = anamnesisService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/anamneses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /anamneses/:id : get the "id" anamnesis.
     *
     * @param id the id of the anamnesisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the anamnesisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/anamneses/{id}")
    @Timed
    public ResponseEntity<AnamnesisDTO> getAnamnesis(@PathVariable Long id) {
        log.debug("REST request to get Anamnesis : {}", id);
        AnamnesisDTO anamnesisDTO = anamnesisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(anamnesisDTO));
    }

    /**
     * DELETE  /anamneses/:id : delete the "id" anamnesis.
     *
     * @param id the id of the anamnesisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/anamneses/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnamnesis(@PathVariable Long id) {
        log.debug("REST request to delete Anamnesis : {}", id);
        anamnesisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
