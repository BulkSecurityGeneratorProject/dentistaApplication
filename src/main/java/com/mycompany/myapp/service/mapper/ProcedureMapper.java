package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.ProcedureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Procedure and its DTO ProcedureDTO.
 */
@Mapper(componentModel = "spring", uses = {AppointmentItemMapper.class, })
public interface ProcedureMapper extends EntityMapper <ProcedureDTO, Procedure> {

    @Mapping(source = "procedure.id", target = "procedureId")
    ProcedureDTO toDto(Procedure procedure); 

    @Mapping(source = "procedureId", target = "procedure")
    Procedure toEntity(ProcedureDTO procedureDTO); 
    default Procedure fromId(Long id) {
        if (id == null) {
            return null;
        }
        Procedure procedure = new Procedure();
        procedure.setId(id);
        return procedure;
    }
}
