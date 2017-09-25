package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.AppointmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Appointment and its DTO AppointmentDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentMethodMapper.class, PersonMapper.class, })
public interface AppointmentMapper extends EntityMapper <AppointmentDTO, Appointment> {

    @Mapping(source = "paymentMethod.id", target = "paymentMethodId")

    @Mapping(source = "dentist.id", target = "dentistId")

    @Mapping(source = "patient.id", target = "patientId")

    @Mapping(source = "employee.id", target = "employeeId")
    AppointmentDTO toDto(Appointment appointment); 

    @Mapping(source = "paymentMethodId", target = "paymentMethod")

    @Mapping(source = "dentistId", target = "dentist")

    @Mapping(source = "patientId", target = "patient")

    @Mapping(source = "employeeId", target = "employee")
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
