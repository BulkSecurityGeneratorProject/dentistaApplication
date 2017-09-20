package com.mycompany.myapp.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Appointment entity.
 */
public class AppointmentDTO implements Serializable {

    private Long id;

    private ZonedDateTime appointmentDate;

    private Long paymentMethodId;

    private Long financialMoveId;

    private Long appointmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(ZonedDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Long getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(Long paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public Long getFinancialMoveId() {
        return financialMoveId;
    }

    public void setFinancialMoveId(Long financialMoveId) {
        this.financialMoveId = financialMoveId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentItemId) {
        this.appointmentId = appointmentItemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AppointmentDTO appointmentDTO = (AppointmentDTO) o;
        if(appointmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppointmentDTO{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            "}";
    }
}
