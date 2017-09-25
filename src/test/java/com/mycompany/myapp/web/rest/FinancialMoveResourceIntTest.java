package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DentistApplicationApp;

import com.mycompany.myapp.domain.FinancialMove;
import com.mycompany.myapp.repository.FinancialMoveRepository;
import com.mycompany.myapp.service.FinancialMoveService;
import com.mycompany.myapp.service.dto.FinancialMoveDTO;
import com.mycompany.myapp.service.mapper.FinancialMoveMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FinancialMoveResource REST controller.
 *
 * @see FinancialMoveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DentistApplicationApp.class)
public class FinancialMoveResourceIntTest {

    private static final BigDecimal DEFAULT_PREVIOU_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PREVIOU_BALANCE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CURRENT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_CURRENT_BALANCE = new BigDecimal(2);

    private static final ZonedDateTime DEFAULT_MOVE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MOVE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_OBSERVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION = "BBBBBBBBBB";

    @Autowired
    private FinancialMoveRepository financialMoveRepository;

    @Autowired
    private FinancialMoveMapper financialMoveMapper;

    @Autowired
    private FinancialMoveService financialMoveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFinancialMoveMockMvc;

    private FinancialMove financialMove;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FinancialMoveResource financialMoveResource = new FinancialMoveResource(financialMoveService);
        this.restFinancialMoveMockMvc = MockMvcBuilders.standaloneSetup(financialMoveResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FinancialMove createEntity(EntityManager em) {
        FinancialMove financialMove = new FinancialMove()
            .previouBalance(DEFAULT_PREVIOU_BALANCE)
            .currentBalance(DEFAULT_CURRENT_BALANCE)
            .moveDate(DEFAULT_MOVE_DATE)
            .observation(DEFAULT_OBSERVATION);
        return financialMove;
    }

    @Before
    public void initTest() {
        financialMove = createEntity(em);
    }

    @Test
    @Transactional
    public void createFinancialMove() throws Exception {
        int databaseSizeBeforeCreate = financialMoveRepository.findAll().size();

        // Create the FinancialMove
        FinancialMoveDTO financialMoveDTO = financialMoveMapper.toDto(financialMove);
        restFinancialMoveMockMvc.perform(post("/api/financial-moves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financialMoveDTO)))
            .andExpect(status().isCreated());

        // Validate the FinancialMove in the database
        List<FinancialMove> financialMoveList = financialMoveRepository.findAll();
        assertThat(financialMoveList).hasSize(databaseSizeBeforeCreate + 1);
        FinancialMove testFinancialMove = financialMoveList.get(financialMoveList.size() - 1);
        assertThat(testFinancialMove.getPreviouBalance()).isEqualTo(DEFAULT_PREVIOU_BALANCE);
        assertThat(testFinancialMove.getCurrentBalance()).isEqualTo(DEFAULT_CURRENT_BALANCE);
        assertThat(testFinancialMove.getMoveDate()).isEqualTo(DEFAULT_MOVE_DATE);
        assertThat(testFinancialMove.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
    }

    @Test
    @Transactional
    public void createFinancialMoveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = financialMoveRepository.findAll().size();

        // Create the FinancialMove with an existing ID
        financialMove.setId(1L);
        FinancialMoveDTO financialMoveDTO = financialMoveMapper.toDto(financialMove);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFinancialMoveMockMvc.perform(post("/api/financial-moves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financialMoveDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FinancialMove in the database
        List<FinancialMove> financialMoveList = financialMoveRepository.findAll();
        assertThat(financialMoveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFinancialMoves() throws Exception {
        // Initialize the database
        financialMoveRepository.saveAndFlush(financialMove);

        // Get all the financialMoveList
        restFinancialMoveMockMvc.perform(get("/api/financial-moves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(financialMove.getId().intValue())))
            .andExpect(jsonPath("$.[*].previouBalance").value(hasItem(DEFAULT_PREVIOU_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].currentBalance").value(hasItem(DEFAULT_CURRENT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].moveDate").value(hasItem(sameInstant(DEFAULT_MOVE_DATE))))
            .andExpect(jsonPath("$.[*].observation").value(hasItem(DEFAULT_OBSERVATION.toString())));
    }

    @Test
    @Transactional
    public void getFinancialMove() throws Exception {
        // Initialize the database
        financialMoveRepository.saveAndFlush(financialMove);

        // Get the financialMove
        restFinancialMoveMockMvc.perform(get("/api/financial-moves/{id}", financialMove.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(financialMove.getId().intValue()))
            .andExpect(jsonPath("$.previouBalance").value(DEFAULT_PREVIOU_BALANCE.intValue()))
            .andExpect(jsonPath("$.currentBalance").value(DEFAULT_CURRENT_BALANCE.intValue()))
            .andExpect(jsonPath("$.moveDate").value(sameInstant(DEFAULT_MOVE_DATE)))
            .andExpect(jsonPath("$.observation").value(DEFAULT_OBSERVATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFinancialMove() throws Exception {
        // Get the financialMove
        restFinancialMoveMockMvc.perform(get("/api/financial-moves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFinancialMove() throws Exception {
        // Initialize the database
        financialMoveRepository.saveAndFlush(financialMove);
        int databaseSizeBeforeUpdate = financialMoveRepository.findAll().size();

        // Update the financialMove
        FinancialMove updatedFinancialMove = financialMoveRepository.findOne(financialMove.getId());
        updatedFinancialMove
            .previouBalance(UPDATED_PREVIOU_BALANCE)
            .currentBalance(UPDATED_CURRENT_BALANCE)
            .moveDate(UPDATED_MOVE_DATE)
            .observation(UPDATED_OBSERVATION);
        FinancialMoveDTO financialMoveDTO = financialMoveMapper.toDto(updatedFinancialMove);

        restFinancialMoveMockMvc.perform(put("/api/financial-moves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financialMoveDTO)))
            .andExpect(status().isOk());

        // Validate the FinancialMove in the database
        List<FinancialMove> financialMoveList = financialMoveRepository.findAll();
        assertThat(financialMoveList).hasSize(databaseSizeBeforeUpdate);
        FinancialMove testFinancialMove = financialMoveList.get(financialMoveList.size() - 1);
        assertThat(testFinancialMove.getPreviouBalance()).isEqualTo(UPDATED_PREVIOU_BALANCE);
        assertThat(testFinancialMove.getCurrentBalance()).isEqualTo(UPDATED_CURRENT_BALANCE);
        assertThat(testFinancialMove.getMoveDate()).isEqualTo(UPDATED_MOVE_DATE);
        assertThat(testFinancialMove.getObservation()).isEqualTo(UPDATED_OBSERVATION);
    }

    @Test
    @Transactional
    public void updateNonExistingFinancialMove() throws Exception {
        int databaseSizeBeforeUpdate = financialMoveRepository.findAll().size();

        // Create the FinancialMove
        FinancialMoveDTO financialMoveDTO = financialMoveMapper.toDto(financialMove);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFinancialMoveMockMvc.perform(put("/api/financial-moves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financialMoveDTO)))
            .andExpect(status().isCreated());

        // Validate the FinancialMove in the database
        List<FinancialMove> financialMoveList = financialMoveRepository.findAll();
        assertThat(financialMoveList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFinancialMove() throws Exception {
        // Initialize the database
        financialMoveRepository.saveAndFlush(financialMove);
        int databaseSizeBeforeDelete = financialMoveRepository.findAll().size();

        // Get the financialMove
        restFinancialMoveMockMvc.perform(delete("/api/financial-moves/{id}", financialMove.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FinancialMove> financialMoveList = financialMoveRepository.findAll();
        assertThat(financialMoveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FinancialMove.class);
        FinancialMove financialMove1 = new FinancialMove();
        financialMove1.setId(1L);
        FinancialMove financialMove2 = new FinancialMove();
        financialMove2.setId(financialMove1.getId());
        assertThat(financialMove1).isEqualTo(financialMove2);
        financialMove2.setId(2L);
        assertThat(financialMove1).isNotEqualTo(financialMove2);
        financialMove1.setId(null);
        assertThat(financialMove1).isNotEqualTo(financialMove2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FinancialMoveDTO.class);
        FinancialMoveDTO financialMoveDTO1 = new FinancialMoveDTO();
        financialMoveDTO1.setId(1L);
        FinancialMoveDTO financialMoveDTO2 = new FinancialMoveDTO();
        assertThat(financialMoveDTO1).isNotEqualTo(financialMoveDTO2);
        financialMoveDTO2.setId(financialMoveDTO1.getId());
        assertThat(financialMoveDTO1).isEqualTo(financialMoveDTO2);
        financialMoveDTO2.setId(2L);
        assertThat(financialMoveDTO1).isNotEqualTo(financialMoveDTO2);
        financialMoveDTO1.setId(null);
        assertThat(financialMoveDTO1).isNotEqualTo(financialMoveDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(financialMoveMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(financialMoveMapper.fromId(null)).isNull();
    }
}
