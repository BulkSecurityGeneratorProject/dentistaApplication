package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DentistApplicationApp;

import com.mycompany.myapp.domain.AppointmentItem;
import com.mycompany.myapp.repository.AppointmentItemRepository;
import com.mycompany.myapp.service.AppointmentItemService;
import com.mycompany.myapp.service.dto.AppointmentItemDTO;
import com.mycompany.myapp.service.mapper.AppointmentItemMapper;
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

/**
 * Test class for the AppointmentItemResource REST controller.
 *
 * @see AppointmentItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DentistApplicationApp.class)
public class AppointmentItemResourceIntTest {

    private static final String DEFAULT_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_ITEM = "BBBBBBBBBB";

    @Autowired
    private AppointmentItemRepository appointmentItemRepository;

    @Autowired
    private AppointmentItemMapper appointmentItemMapper;

    @Autowired
    private AppointmentItemService appointmentItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAppointmentItemMockMvc;

    private AppointmentItem appointmentItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppointmentItemResource appointmentItemResource = new AppointmentItemResource(appointmentItemService);
        this.restAppointmentItemMockMvc = MockMvcBuilders.standaloneSetup(appointmentItemResource)
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
    public static AppointmentItem createEntity(EntityManager em) {
        AppointmentItem appointmentItem = new AppointmentItem()
            .item(DEFAULT_ITEM);
        return appointmentItem;
    }

    @Before
    public void initTest() {
        appointmentItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppointmentItem() throws Exception {
        int databaseSizeBeforeCreate = appointmentItemRepository.findAll().size();

        // Create the AppointmentItem
        AppointmentItemDTO appointmentItemDTO = appointmentItemMapper.toDto(appointmentItem);
        restAppointmentItemMockMvc.perform(post("/api/appointment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentItemDTO)))
            .andExpect(status().isCreated());

        // Validate the AppointmentItem in the database
        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findAll();
        assertThat(appointmentItemList).hasSize(databaseSizeBeforeCreate + 1);
        AppointmentItem testAppointmentItem = appointmentItemList.get(appointmentItemList.size() - 1);
        assertThat(testAppointmentItem.getItem()).isEqualTo(DEFAULT_ITEM);
    }

    @Test
    @Transactional
    public void createAppointmentItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appointmentItemRepository.findAll().size();

        // Create the AppointmentItem with an existing ID
        appointmentItem.setId(1L);
        AppointmentItemDTO appointmentItemDTO = appointmentItemMapper.toDto(appointmentItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppointmentItemMockMvc.perform(post("/api/appointment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AppointmentItem in the database
        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findAll();
        assertThat(appointmentItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAppointmentItems() throws Exception {
        // Initialize the database
        appointmentItemRepository.saveAndFlush(appointmentItem);

        // Get all the appointmentItemList
        restAppointmentItemMockMvc.perform(get("/api/appointment-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appointmentItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM.toString())));
    }

    @Test
    @Transactional
    public void getAppointmentItem() throws Exception {
        // Initialize the database
        appointmentItemRepository.saveAndFlush(appointmentItem);

        // Get the appointmentItem
        restAppointmentItemMockMvc.perform(get("/api/appointment-items/{id}", appointmentItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appointmentItem.getId().intValue()))
            .andExpect(jsonPath("$.item").value(DEFAULT_ITEM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppointmentItem() throws Exception {
        // Get the appointmentItem
        restAppointmentItemMockMvc.perform(get("/api/appointment-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppointmentItem() throws Exception {
        // Initialize the database
        appointmentItemRepository.saveAndFlush(appointmentItem);
        int databaseSizeBeforeUpdate = appointmentItemRepository.findAll().size();

        // Update the appointmentItem
        AppointmentItem updatedAppointmentItem = appointmentItemRepository.findOne(appointmentItem.getId());
        updatedAppointmentItem
            .item(UPDATED_ITEM);
        AppointmentItemDTO appointmentItemDTO = appointmentItemMapper.toDto(updatedAppointmentItem);

        restAppointmentItemMockMvc.perform(put("/api/appointment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentItemDTO)))
            .andExpect(status().isOk());

        // Validate the AppointmentItem in the database
        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findAll();
        assertThat(appointmentItemList).hasSize(databaseSizeBeforeUpdate);
        AppointmentItem testAppointmentItem = appointmentItemList.get(appointmentItemList.size() - 1);
        assertThat(testAppointmentItem.getItem()).isEqualTo(UPDATED_ITEM);
    }

    @Test
    @Transactional
    public void updateNonExistingAppointmentItem() throws Exception {
        int databaseSizeBeforeUpdate = appointmentItemRepository.findAll().size();

        // Create the AppointmentItem
        AppointmentItemDTO appointmentItemDTO = appointmentItemMapper.toDto(appointmentItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAppointmentItemMockMvc.perform(put("/api/appointment-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appointmentItemDTO)))
            .andExpect(status().isCreated());

        // Validate the AppointmentItem in the database
        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findAll();
        assertThat(appointmentItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAppointmentItem() throws Exception {
        // Initialize the database
        appointmentItemRepository.saveAndFlush(appointmentItem);
        int databaseSizeBeforeDelete = appointmentItemRepository.findAll().size();

        // Get the appointmentItem
        restAppointmentItemMockMvc.perform(delete("/api/appointment-items/{id}", appointmentItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AppointmentItem> appointmentItemList = appointmentItemRepository.findAll();
        assertThat(appointmentItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppointmentItem.class);
        AppointmentItem appointmentItem1 = new AppointmentItem();
        appointmentItem1.setId(1L);
        AppointmentItem appointmentItem2 = new AppointmentItem();
        appointmentItem2.setId(appointmentItem1.getId());
        assertThat(appointmentItem1).isEqualTo(appointmentItem2);
        appointmentItem2.setId(2L);
        assertThat(appointmentItem1).isNotEqualTo(appointmentItem2);
        appointmentItem1.setId(null);
        assertThat(appointmentItem1).isNotEqualTo(appointmentItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppointmentItemDTO.class);
        AppointmentItemDTO appointmentItemDTO1 = new AppointmentItemDTO();
        appointmentItemDTO1.setId(1L);
        AppointmentItemDTO appointmentItemDTO2 = new AppointmentItemDTO();
        assertThat(appointmentItemDTO1).isNotEqualTo(appointmentItemDTO2);
        appointmentItemDTO2.setId(appointmentItemDTO1.getId());
        assertThat(appointmentItemDTO1).isEqualTo(appointmentItemDTO2);
        appointmentItemDTO2.setId(2L);
        assertThat(appointmentItemDTO1).isNotEqualTo(appointmentItemDTO2);
        appointmentItemDTO1.setId(null);
        assertThat(appointmentItemDTO1).isNotEqualTo(appointmentItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(appointmentItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(appointmentItemMapper.fromId(null)).isNull();
    }
}
