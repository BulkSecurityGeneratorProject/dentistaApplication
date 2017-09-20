package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DentistApplicationApp;

import com.mycompany.myapp.domain.PersonAddress;
import com.mycompany.myapp.repository.PersonAddressRepository;
import com.mycompany.myapp.service.PersonAddressService;
import com.mycompany.myapp.service.dto.PersonAddressDTO;
import com.mycompany.myapp.service.mapper.PersonAddressMapper;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.BrazilianStates;
import com.mycompany.myapp.domain.enumeration.LogradouroType;
/**
 * Test class for the PersonAddressResource REST controller.
 *
 * @see PersonAddressResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DentistApplicationApp.class)
public class PersonAddressResourceIntTest {

    private static final String DEFAULT_LOGRADOURO = "AAAAAAAAAA";
    private static final String UPDATED_LOGRADOURO = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final BrazilianStates DEFAULT_STATE = BrazilianStates.AC;
    private static final BrazilianStates UPDATED_STATE = BrazilianStates.AL;

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_NEIGHBORHOOD = "AAAAAAAAAA";
    private static final String UPDATED_NEIGHBORHOOD = "BBBBBBBBBB";

    private static final String DEFAULT_COMPLEMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMPLEMENT = "BBBBBBBBBB";

    private static final LogradouroType DEFAULT_TYPE = LogradouroType.COMMERCIAL;
    private static final LogradouroType UPDATED_TYPE = LogradouroType.PERSONAL;

    @Autowired
    private PersonAddressRepository personAddressRepository;

    @Autowired
    private PersonAddressMapper personAddressMapper;

    @Autowired
    private PersonAddressService personAddressService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonAddressMockMvc;

    private PersonAddress personAddress;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonAddressResource personAddressResource = new PersonAddressResource(personAddressService);
        this.restPersonAddressMockMvc = MockMvcBuilders.standaloneSetup(personAddressResource)
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
    public static PersonAddress createEntity(EntityManager em) {
        PersonAddress personAddress = new PersonAddress()
            .logradouro(DEFAULT_LOGRADOURO)
            .address(DEFAULT_ADDRESS)
            .number(DEFAULT_NUMBER)
            .state(DEFAULT_STATE)
            .city(DEFAULT_CITY)
            .neighborhood(DEFAULT_NEIGHBORHOOD)
            .complement(DEFAULT_COMPLEMENT)
            .type(DEFAULT_TYPE);
        return personAddress;
    }

    @Before
    public void initTest() {
        personAddress = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonAddress() throws Exception {
        int databaseSizeBeforeCreate = personAddressRepository.findAll().size();

        // Create the PersonAddress
        PersonAddressDTO personAddressDTO = personAddressMapper.toDto(personAddress);
        restPersonAddressMockMvc.perform(post("/api/person-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personAddressDTO)))
            .andExpect(status().isCreated());

        // Validate the PersonAddress in the database
        List<PersonAddress> personAddressList = personAddressRepository.findAll();
        assertThat(personAddressList).hasSize(databaseSizeBeforeCreate + 1);
        PersonAddress testPersonAddress = personAddressList.get(personAddressList.size() - 1);
        assertThat(testPersonAddress.getLogradouro()).isEqualTo(DEFAULT_LOGRADOURO);
        assertThat(testPersonAddress.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testPersonAddress.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testPersonAddress.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testPersonAddress.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testPersonAddress.getNeighborhood()).isEqualTo(DEFAULT_NEIGHBORHOOD);
        assertThat(testPersonAddress.getComplement()).isEqualTo(DEFAULT_COMPLEMENT);
        assertThat(testPersonAddress.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createPersonAddressWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personAddressRepository.findAll().size();

        // Create the PersonAddress with an existing ID
        personAddress.setId(1L);
        PersonAddressDTO personAddressDTO = personAddressMapper.toDto(personAddress);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonAddressMockMvc.perform(post("/api/person-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personAddressDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PersonAddress in the database
        List<PersonAddress> personAddressList = personAddressRepository.findAll();
        assertThat(personAddressList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPersonAddresses() throws Exception {
        // Initialize the database
        personAddressRepository.saveAndFlush(personAddress);

        // Get all the personAddressList
        restPersonAddressMockMvc.perform(get("/api/person-addresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personAddress.getId().intValue())))
            .andExpect(jsonPath("$.[*].logradouro").value(hasItem(DEFAULT_LOGRADOURO.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].neighborhood").value(hasItem(DEFAULT_NEIGHBORHOOD.toString())))
            .andExpect(jsonPath("$.[*].complement").value(hasItem(DEFAULT_COMPLEMENT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getPersonAddress() throws Exception {
        // Initialize the database
        personAddressRepository.saveAndFlush(personAddress);

        // Get the personAddress
        restPersonAddressMockMvc.perform(get("/api/person-addresses/{id}", personAddress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personAddress.getId().intValue()))
            .andExpect(jsonPath("$.logradouro").value(DEFAULT_LOGRADOURO.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.neighborhood").value(DEFAULT_NEIGHBORHOOD.toString()))
            .andExpect(jsonPath("$.complement").value(DEFAULT_COMPLEMENT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersonAddress() throws Exception {
        // Get the personAddress
        restPersonAddressMockMvc.perform(get("/api/person-addresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonAddress() throws Exception {
        // Initialize the database
        personAddressRepository.saveAndFlush(personAddress);
        int databaseSizeBeforeUpdate = personAddressRepository.findAll().size();

        // Update the personAddress
        PersonAddress updatedPersonAddress = personAddressRepository.findOne(personAddress.getId());
        updatedPersonAddress
            .logradouro(UPDATED_LOGRADOURO)
            .address(UPDATED_ADDRESS)
            .number(UPDATED_NUMBER)
            .state(UPDATED_STATE)
            .city(UPDATED_CITY)
            .neighborhood(UPDATED_NEIGHBORHOOD)
            .complement(UPDATED_COMPLEMENT)
            .type(UPDATED_TYPE);
        PersonAddressDTO personAddressDTO = personAddressMapper.toDto(updatedPersonAddress);

        restPersonAddressMockMvc.perform(put("/api/person-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personAddressDTO)))
            .andExpect(status().isOk());

        // Validate the PersonAddress in the database
        List<PersonAddress> personAddressList = personAddressRepository.findAll();
        assertThat(personAddressList).hasSize(databaseSizeBeforeUpdate);
        PersonAddress testPersonAddress = personAddressList.get(personAddressList.size() - 1);
        assertThat(testPersonAddress.getLogradouro()).isEqualTo(UPDATED_LOGRADOURO);
        assertThat(testPersonAddress.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testPersonAddress.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testPersonAddress.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testPersonAddress.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testPersonAddress.getNeighborhood()).isEqualTo(UPDATED_NEIGHBORHOOD);
        assertThat(testPersonAddress.getComplement()).isEqualTo(UPDATED_COMPLEMENT);
        assertThat(testPersonAddress.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonAddress() throws Exception {
        int databaseSizeBeforeUpdate = personAddressRepository.findAll().size();

        // Create the PersonAddress
        PersonAddressDTO personAddressDTO = personAddressMapper.toDto(personAddress);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonAddressMockMvc.perform(put("/api/person-addresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personAddressDTO)))
            .andExpect(status().isCreated());

        // Validate the PersonAddress in the database
        List<PersonAddress> personAddressList = personAddressRepository.findAll();
        assertThat(personAddressList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePersonAddress() throws Exception {
        // Initialize the database
        personAddressRepository.saveAndFlush(personAddress);
        int databaseSizeBeforeDelete = personAddressRepository.findAll().size();

        // Get the personAddress
        restPersonAddressMockMvc.perform(delete("/api/person-addresses/{id}", personAddress.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PersonAddress> personAddressList = personAddressRepository.findAll();
        assertThat(personAddressList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonAddress.class);
        PersonAddress personAddress1 = new PersonAddress();
        personAddress1.setId(1L);
        PersonAddress personAddress2 = new PersonAddress();
        personAddress2.setId(personAddress1.getId());
        assertThat(personAddress1).isEqualTo(personAddress2);
        personAddress2.setId(2L);
        assertThat(personAddress1).isNotEqualTo(personAddress2);
        personAddress1.setId(null);
        assertThat(personAddress1).isNotEqualTo(personAddress2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonAddressDTO.class);
        PersonAddressDTO personAddressDTO1 = new PersonAddressDTO();
        personAddressDTO1.setId(1L);
        PersonAddressDTO personAddressDTO2 = new PersonAddressDTO();
        assertThat(personAddressDTO1).isNotEqualTo(personAddressDTO2);
        personAddressDTO2.setId(personAddressDTO1.getId());
        assertThat(personAddressDTO1).isEqualTo(personAddressDTO2);
        personAddressDTO2.setId(2L);
        assertThat(personAddressDTO1).isNotEqualTo(personAddressDTO2);
        personAddressDTO1.setId(null);
        assertThat(personAddressDTO1).isNotEqualTo(personAddressDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(personAddressMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(personAddressMapper.fromId(null)).isNull();
    }
}
