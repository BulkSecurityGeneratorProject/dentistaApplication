package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "appointment_date")
    private ZonedDateTime appointmentDate;

    @OneToOne
    @JoinColumn(unique = true)
    private PaymentMethod paymentMethod;

    @OneToOne
    @JoinColumn(unique = true)
    private FinancialMove financialMove;

    @ManyToOne
    private AppointmentItem appointment;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public Appointment appointmentDate(ZonedDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
        return this;
    }

    public void setAppointmentDate(ZonedDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public Appointment paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public FinancialMove getFinancialMove() {
        return financialMove;
    }

    public Appointment financialMove(FinancialMove financialMove) {
        this.financialMove = financialMove;
        return this;
    }

    public void setFinancialMove(FinancialMove financialMove) {
        this.financialMove = financialMove;
    }

    public AppointmentItem getAppointment() {
        return appointment;
    }

    public Appointment appointment(AppointmentItem appointmentItem) {
        this.appointment = appointmentItem;
        return this;
    }

    public void setAppointment(AppointmentItem appointmentItem) {
        this.appointment = appointmentItem;
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
        Appointment appointment = (Appointment) o;
        if (appointment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appointment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", appointmentDate='" + getAppointmentDate() + "'" +
            "}";
    }
}
