package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {AnamnesisMapper.class, AppointmentMapper.class, PersonAddressMapper.class, })
public interface PersonMapper extends EntityMapper <PersonDTO, Person> {

    @Mapping(source = "anamnesis.id", target = "anamnesisId")

    @Mapping(source = "dentist.id", target = "dentistId")

    @Mapping(source = "patient.id", target = "patientId")

    @Mapping(source = "employee.id", target = "employeeId")

    @Mapping(source = "person.id", target = "personId")
    PersonDTO toDto(Person person); 

    @Mapping(source = "anamnesisId", target = "anamnesis")

    @Mapping(source = "dentistId", target = "dentist")

    @Mapping(source = "patientId", target = "patient")

    @Mapping(source = "employeeId", target = "employee")

    @Mapping(source = "personId", target = "person")
    Person toEntity(PersonDTO personDTO); 
    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
