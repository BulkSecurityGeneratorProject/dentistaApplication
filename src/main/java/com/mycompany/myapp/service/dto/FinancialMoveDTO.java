package com.mycompany.myapp.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the FinancialMove entity.
 */
public class FinancialMoveDTO implements Serializable {

    private Long id;

    private Double previouBalance;

    private Double currentBalance;

    private ZonedDateTime moveDate;

    private String observation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPreviouBalance() {
        return previouBalance;
    }

    public void setPreviouBalance(Double previouBalance) {
        this.previouBalance = previouBalance;
    }

    public Double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public ZonedDateTime getMoveDate() {
        return moveDate;
    }

    public void setMoveDate(ZonedDateTime moveDate) {
        this.moveDate = moveDate;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FinancialMoveDTO financialMoveDTO = (FinancialMoveDTO) o;
        if(financialMoveDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), financialMoveDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinancialMoveDTO{" +
            "id=" + getId() +
            ", previouBalance='" + getPreviouBalance() + "'" +
            ", currentBalance='" + getCurrentBalance() + "'" +
            ", moveDate='" + getMoveDate() + "'" +
            ", observation='" + getObservation() + "'" +
            "}";
    }
}
