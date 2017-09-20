package com.mycompany.myapp.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Person entity.
 */
public class PersonDTO implements Serializable {

    private Long id;

    @NotNull
    private String fullName;

    private String phone1;

    private String phone2;

    private String email;

    private String cpf;

    private ZonedDateTime hireDate;

    private Boolean isEmployee;

    private Boolean isDentist;

    private Boolean isPatient;

    private Long anamnesisId;

    private Long dentistId;

    private Long patientId;

    private Long employeeId;

    private Long personId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public ZonedDateTime getHireDate() {
        return hireDate;
    }

    public void setHireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
    }

    public Boolean isIsEmployee() {
        return isEmployee;
    }

    public void setIsEmployee(Boolean isEmployee) {
        this.isEmployee = isEmployee;
    }

    public Boolean isIsDentist() {
        return isDentist;
    }

    public void setIsDentist(Boolean isDentist) {
        this.isDentist = isDentist;
    }

    public Boolean isIsPatient() {
        return isPatient;
    }

    public void setIsPatient(Boolean isPatient) {
        this.isPatient = isPatient;
    }

    public Long getAnamnesisId() {
        return anamnesisId;
    }

    public void setAnamnesisId(Long anamnesisId) {
        this.anamnesisId = anamnesisId;
    }

    public Long getDentistId() {
        return dentistId;
    }

    public void setDentistId(Long appointmentId) {
        this.dentistId = appointmentId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long appointmentId) {
        this.patientId = appointmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long appointmentId) {
        this.employeeId = appointmentId;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personAddressId) {
        this.personId = personAddressId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonDTO personDTO = (PersonDTO) o;
        if(personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", phone1='" + getPhone1() + "'" +
            ", phone2='" + getPhone2() + "'" +
            ", email='" + getEmail() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", isEmployee='" + isIsEmployee() + "'" +
            ", isDentist='" + isIsDentist() + "'" +
            ", isPatient='" + isIsPatient() + "'" +
            "}";
    }
}
