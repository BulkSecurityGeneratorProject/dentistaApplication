package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PersonAddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PersonAddress and its DTO PersonAddressDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PersonAddressMapper extends EntityMapper <PersonAddressDTO, PersonAddress> {
    
    
    default PersonAddress fromId(Long id) {
        if (id == null) {
            return null;
        }
        PersonAddress personAddress = new PersonAddress();
        personAddress.setId(id);
        return personAddress;
    }
}
