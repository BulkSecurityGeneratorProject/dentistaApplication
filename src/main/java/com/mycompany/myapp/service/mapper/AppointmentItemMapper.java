package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AppointmentItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AppointmentItem and its DTO AppointmentItemDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AppointmentItemMapper extends EntityMapper <AppointmentItemDTO, AppointmentItem> {
    
    
    default AppointmentItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppointmentItem appointmentItem = new AppointmentItem();
        appointmentItem.setId(id);
        return appointmentItem;
    }
}
