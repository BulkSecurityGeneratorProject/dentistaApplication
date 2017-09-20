package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.FinancialMoveService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.FinancialMoveDTO;
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
 * REST controller for managing FinancialMove.
 */
@RestController
@RequestMapping("/api")
public class FinancialMoveResource {

    private final Logger log = LoggerFactory.getLogger(FinancialMoveResource.class);

    private static final String ENTITY_NAME = "financialMove";

    private final FinancialMoveService financialMoveService;

    public FinancialMoveResource(FinancialMoveService financialMoveService) {
        this.financialMoveService = financialMoveService;
    }

    /**
     * POST  /financial-moves : Create a new financialMove.
     *
     * @param financialMoveDTO the financialMoveDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new financialMoveDTO, or with status 400 (Bad Request) if the financialMove has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/financial-moves")
    @Timed
    public ResponseEntity<FinancialMoveDTO> createFinancialMove(@RequestBody FinancialMoveDTO financialMoveDTO) throws URISyntaxException {
        log.debug("REST request to save FinancialMove : {}", financialMoveDTO);
        if (financialMoveDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new financialMove cannot already have an ID")).body(null);
        }
        FinancialMoveDTO result = financialMoveService.save(financialMoveDTO);
        return ResponseEntity.created(new URI("/api/financial-moves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /financial-moves : Updates an existing financialMove.
     *
     * @param financialMoveDTO the financialMoveDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated financialMoveDTO,
     * or with status 400 (Bad Request) if the financialMoveDTO is not valid,
     * or with status 500 (Internal Server Error) if the financialMoveDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/financial-moves")
    @Timed
    public ResponseEntity<FinancialMoveDTO> updateFinancialMove(@RequestBody FinancialMoveDTO financialMoveDTO) throws URISyntaxException {
        log.debug("REST request to update FinancialMove : {}", financialMoveDTO);
        if (financialMoveDTO.getId() == null) {
            return createFinancialMove(financialMoveDTO);
        }
        FinancialMoveDTO result = financialMoveService.save(financialMoveDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, financialMoveDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /financial-moves : get all the financialMoves.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of financialMoves in body
     */
    @GetMapping("/financial-moves")
    @Timed
    public ResponseEntity<List<FinancialMoveDTO>> getAllFinancialMoves(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of FinancialMoves");
        Page<FinancialMoveDTO> page = financialMoveService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/financial-moves");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /financial-moves/:id : get the "id" financialMove.
     *
     * @param id the id of the financialMoveDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the financialMoveDTO, or with status 404 (Not Found)
     */
    @GetMapping("/financial-moves/{id}")
    @Timed
    public ResponseEntity<FinancialMoveDTO> getFinancialMove(@PathVariable Long id) {
        log.debug("REST request to get FinancialMove : {}", id);
        FinancialMoveDTO financialMoveDTO = financialMoveService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(financialMoveDTO));
    }

    /**
     * DELETE  /financial-moves/:id : delete the "id" financialMove.
     *
     * @param id the id of the financialMoveDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/financial-moves/{id}")
    @Timed
    public ResponseEntity<Void> deleteFinancialMove(@PathVariable Long id) {
        log.debug("REST request to delete FinancialMove : {}", id);
        financialMoveService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
