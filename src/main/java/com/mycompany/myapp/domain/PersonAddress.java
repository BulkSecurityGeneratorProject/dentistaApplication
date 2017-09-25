package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.BrazilianStates;

import com.mycompany.myapp.domain.enumeration.LogradouroType;

/**
 * A PersonAddress.
 */
@Entity
@Table(name = "person_address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PersonAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "logradouro")
    private String logradouro;

    @Column(name = "address")
    private String address;

    @Column(name = "jhi_number")
    private String number;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private BrazilianStates state;

    @Column(name = "city")
    private String city;

    @Column(name = "neighborhood")
    private String neighborhood;

    @Column(name = "complement")
    private String complement;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private LogradouroType type;

    @ManyToOne
    private Person person;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public PersonAddress logradouro(String logradouro) {
        this.logradouro = logradouro;
        return this;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getAddress() {
        return address;
    }

    public PersonAddress address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public PersonAddress number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public BrazilianStates getState() {
        return state;
    }

    public PersonAddress state(BrazilianStates state) {
        this.state = state;
        return this;
    }

    public void setState(BrazilianStates state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public PersonAddress city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public PersonAddress neighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
        return this;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getComplement() {
        return complement;
    }

    public PersonAddress complement(String complement) {
        this.complement = complement;
        return this;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public LogradouroType getType() {
        return type;
    }

    public PersonAddress type(LogradouroType type) {
        this.type = type;
        return this;
    }

    public void setType(LogradouroType type) {
        this.type = type;
    }

    public Person getPerson() {
        return person;
    }

    public PersonAddress person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
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
        PersonAddress personAddress = (PersonAddress) o;
        if (personAddress.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personAddress.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonAddress{" +
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
