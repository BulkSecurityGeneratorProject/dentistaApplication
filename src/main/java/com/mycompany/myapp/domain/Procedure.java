package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Procedure.
 */
@Entity
@Table(name = "procedure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Procedure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_value")
    private Double value;

    @ManyToOne
    private AppointmentItem procedure;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Procedure description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getValue() {
        return value;
    }

    public Procedure value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public AppointmentItem getProcedure() {
        return procedure;
    }

    public Procedure procedure(AppointmentItem appointmentItem) {
        this.procedure = appointmentItem;
        return this;
    }

    public void setProcedure(AppointmentItem appointmentItem) {
        this.procedure = appointmentItem;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Procedure procedure = (Procedure) o;
        if (procedure.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), procedure.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Procedure{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
