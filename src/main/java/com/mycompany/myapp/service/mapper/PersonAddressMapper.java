package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PersonAddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PersonAddress and its DTO PersonAddressDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, })
public interface PersonAddressMapper extends EntityMapper <PersonAddressDTO, PersonAddress> {

    @Mapping(source = "person.id", target = "personId")
    PersonAddressDTO toDto(PersonAddress personAddress); 

    @Mapping(source = "personId", target = "person")
    PersonAddress toEntity(PersonAddressDTO personAddressDTO); 
    default PersonAddress fromId(Long id) {
        if (id == null) {
            return null;
        }
        PersonAddress personAddress = new PersonAddress();
        personAddress.setId(id);
        return personAddress;
    }
}
