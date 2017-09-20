package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.ProcedureService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.ProcedureDTO;
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
 * REST controller for managing Procedure.
 */
@RestController
@RequestMapping("/api")
public class ProcedureResource {

    private final Logger log = LoggerFactory.getLogger(ProcedureResource.class);

    private static final String ENTITY_NAME = "procedure";

    private final ProcedureService procedureService;

    public ProcedureResource(ProcedureService procedureService) {
        this.procedureService = procedureService;
    }

    /**
     * POST  /procedures : Create a new procedure.
     *
     * @param procedureDTO the procedureDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new procedureDTO, or with status 400 (Bad Request) if the procedure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/procedures")
    @Timed
    public ResponseEntity<ProcedureDTO> createProcedure(@RequestBody ProcedureDTO procedureDTO) throws URISyntaxException {
        log.debug("REST request to save Procedure : {}", procedureDTO);
        if (procedureDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new procedure cannot already have an ID")).body(null);
        }
        ProcedureDTO result = procedureService.save(procedureDTO);
        return ResponseEntity.created(new URI("/api/procedures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /procedures : Updates an existing procedure.
     *
     * @param procedureDTO the procedureDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated procedureDTO,
     * or with status 400 (Bad Request) if the procedureDTO is not valid,
     * or with status 500 (Internal Server Error) if the procedureDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/procedures")
    @Timed
    public ResponseEntity<ProcedureDTO> updateProcedure(@RequestBody ProcedureDTO procedureDTO) throws URISyntaxException {
        log.debug("REST request to update Procedure : {}", procedureDTO);
        if (procedureDTO.getId() == null) {
            return createProcedure(procedureDTO);
        }
        ProcedureDTO result = procedureService.save(procedureDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, procedureDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /procedures : get all the procedures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of procedures in body
     */
    @GetMapping("/procedures")
    @Timed
    public ResponseEntity<List<ProcedureDTO>> getAllProcedures(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Procedures");
        Page<ProcedureDTO> page = procedureService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/procedures");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /procedures/:id : get the "id" procedure.
     *
     * @param id the id of the procedureDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the procedureDTO, or with status 404 (Not Found)
     */
    @GetMapping("/procedures/{id}")
    @Timed
    public ResponseEntity<ProcedureDTO> getProcedure(@PathVariable Long id) {
        log.debug("REST request to get Procedure : {}", id);
        ProcedureDTO procedureDTO = procedureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(procedureDTO));
    }

    /**
     * DELETE  /procedures/:id : delete the "id" procedure.
     *
     * @param id the id of the procedureDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/procedures/{id}")
    @Timed
    public ResponseEntity<Void> deleteProcedure(@PathVariable Long id) {
        log.debug("REST request to delete Procedure : {}", id);
        procedureService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
