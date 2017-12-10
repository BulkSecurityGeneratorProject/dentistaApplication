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

    private Long dentistId;

    private String dentistFullName;

    private Long patientId;

    private String patientFullName;

    private Long employeeId;

    private String employeeFullName;

    private Long paymentMethodId;

    private String paymentMethodName;

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

    public Long getDentistId() {
        return dentistId;
    }

    public void setDentistId(Long personId) {
        this.dentistId = personId;
    }

    public String getDentistFullName() {
        return dentistFullName;
    }

    public void setDentistFullName(String personFullName) {
        this.dentistFullName = personFullName;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long personId) {
        this.patientId = personId;
    }

    public String getPatientFullName() {
        return patientFullName;
    }

    public void setPatientFullName(String personFullName) {
        this.patientFullName = personFullName;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long personId) {
        this.employeeId = personId;
    }

    public String getEmployeeFullName() {
        return employeeFullName;
    }

    public void setEmployeeFullName(String personFullName) {
        this.employeeFullName = personFullName;
    }

    public Long getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(Long paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public String getPaymentMethodName() {
        return paymentMethodName;
    }

    public void setPaymentMethodName(String paymentMethodName) {
        this.paymentMethodName = paymentMethodName;
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
