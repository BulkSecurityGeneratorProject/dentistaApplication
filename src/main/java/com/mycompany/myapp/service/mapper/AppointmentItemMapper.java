package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AppointmentItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AppointmentItem and its DTO AppointmentItemDTO.
 */
@Mapper(componentModel = "spring", uses = {AppointmentMapper.class, ProcedureMapper.class, })
public interface AppointmentItemMapper extends EntityMapper <AppointmentItemDTO, AppointmentItem> {

    @Mapping(source = "appointment.id", target = "appointmentId")

    @Mapping(source = "procedure.id", target = "procedureId")
    @Mapping(source = "procedure.description", target = "procedureDescription")
    AppointmentItemDTO toDto(AppointmentItem appointmentItem); 

    @Mapping(source = "appointmentId", target = "appointment")

    @Mapping(source = "procedureId", target = "procedure")
    AppointmentItem toEntity(AppointmentItemDTO appointmentItemDTO); 
    default AppointmentItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppointmentItem appointmentItem = new AppointmentItem();
        appointmentItem.setId(id);
        return appointmentItem;
    }
}
