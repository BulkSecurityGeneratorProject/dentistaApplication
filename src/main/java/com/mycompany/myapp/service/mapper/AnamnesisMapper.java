package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AnamnesisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Anamnesis and its DTO AnamnesisDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AnamnesisMapper extends EntityMapper <AnamnesisDTO, Anamnesis> {
    
    
    default Anamnesis fromId(Long id) {
        if (id == null) {
            return null;
        }
        Anamnesis anamnesis = new Anamnesis();
        anamnesis.setId(id);
        return anamnesis;
    }
}
