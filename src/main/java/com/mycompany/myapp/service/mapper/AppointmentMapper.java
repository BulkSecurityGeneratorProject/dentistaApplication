package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AppointmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Appointment and its DTO AppointmentDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentMethodMapper.class, FinancialMoveMapper.class, AppointmentItemMapper.class, })
public interface AppointmentMapper extends EntityMapper <AppointmentDTO, Appointment> {

    @Mapping(source = "paymentMethod.id", target = "paymentMethodId")

    @Mapping(source = "financialMove.id", target = "financialMoveId")

    @Mapping(source = "appointment.id", target = "appointmentId")
    AppointmentDTO toDto(Appointment appointment); 

    @Mapping(source = "paymentMethodId", target = "paymentMethod")

    @Mapping(source = "financialMoveId", target = "financialMove")

    @Mapping(source = "appointmentId", target = "appointment")
    Appointment toEntity(AppointmentDTO appointmentDTO); 
    default Appointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setId(id);
        return appointment;
    }
}
