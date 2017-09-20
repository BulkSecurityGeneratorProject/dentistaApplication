package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Procedure entity.
 */
public class ProcedureDTO implements Serializable {

    private Long id;

    private String description;

    private Double value;

    private Long procedureId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Long getProcedureId() {
        return procedureId;
    }

    public void setProcedureId(Long appointmentItemId) {
        this.procedureId = appointmentItemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProcedureDTO procedureDTO = (ProcedureDTO) o;
        if(procedureDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), procedureDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProcedureDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
