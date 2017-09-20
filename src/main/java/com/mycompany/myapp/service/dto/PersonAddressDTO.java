package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.BrazilianStates;
import com.mycompany.myapp.domain.enumeration.LogradouroType;

/**
 * A DTO for the PersonAddress entity.
 */
public class PersonAddressDTO implements Serializable {

    private Long id;

    private String logradouro;

    private String address;

    private String number;

    private BrazilianStates state;

    private String city;

    private String neighborhood;

    private String complement;

    private LogradouroType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public BrazilianStates getState() {
        return state;
    }

    public void setState(BrazilianStates state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public LogradouroType getType() {
        return type;
    }

    public void setType(LogradouroType type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonAddressDTO personAddressDTO = (PersonAddressDTO) o;
        if(personAddressDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personAddressDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonAddressDTO{" +
            "id=" + getId() +
            ", logradouro='" + getLogradouro() + "'" +
            ", address='" + getAddress() + "'" +
            ", number='" + getNumber() + "'" +
            ", state='" + getState() + "'" +
            ", city='" + getCity() + "'" +
            ", neighborhood='" + getNeighborhood() + "'" +
            ", complement='" + getComplement() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
