package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A FinancialMove.
 */
@Entity
@Table(name = "financial_move")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FinancialMove implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "previou_balance", precision=10, scale=2)
    private BigDecimal previouBalance;

    @Column(name = "current_balance", precision=10, scale=2)
    private BigDecimal currentBalance;

    @Column(name = "move_date")
    private ZonedDateTime moveDate;

    @Column(name = "observation")
    private String observation;

    @OneToOne
    @JoinColumn(unique = true)
    private Appointment appointment;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPreviouBalance() {
        return previouBalance;
    }

    public FinancialMove previouBalance(BigDecimal previouBalance) {
        this.previouBalance = previouBalance;
        return this;
    }

    public void setPreviouBalance(BigDecimal previouBalance) {
        this.previouBalance = previouBalance;
    }

    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    public FinancialMove currentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
        return this;
    }

    public void setCurrentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

    public ZonedDateTime getMoveDate() {
        return moveDate;
    }

    public FinancialMove moveDate(ZonedDateTime moveDate) {
        this.moveDate = moveDate;
        return this;
    }

    public void setMoveDate(ZonedDateTime moveDate) {
        this.moveDate = moveDate;
    }

    public String getObservation() {
        return observation;
    }

    public FinancialMove observation(String observation) {
        this.observation = observation;
        return this;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public FinancialMove appointment(Appointment appointment) {
        this.appointment = appointment;
        return this;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
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
        FinancialMove financialMove = (FinancialMove) o;
        if (financialMove.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), financialMove.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinancialMove{" +
            "id=" + getId() +
            ", previouBalance='" + getPreviouBalance() + "'" +
            ", currentBalance='" + getCurrentBalance() + "'" +
            ", moveDate='" + getMoveDate() + "'" +
            ", observation='" + getObservation() + "'" +
            "}";
    }
}
