package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone_1")
    private String phone1;

    @Column(name = "phone_2")
    private String phone2;

    @Column(name = "email")
    private String email;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "hire_date")
    private ZonedDateTime hireDate;

    @Column(name = "is_employee")
    private Boolean isEmployee;

    @Column(name = "is_dentist")
    private Boolean isDentist;

    @Column(name = "is_patient")
    private Boolean isPatient;

    @OneToOne
    @JoinColumn(unique = true)
    private Anamnesis anamnesis;

    @ManyToOne
    private Appointment dentist;

    @ManyToOne
    private Appointment patient;

    @ManyToOne
    private Appointment employee;

    @ManyToOne
    private PersonAddress person;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public Person fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone1() {
        return phone1;
    }

    public Person phone1(String phone1) {
        this.phone1 = phone1;
        return this;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public Person phone2(String phone2) {
        this.phone2 = phone2;
        return this;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getEmail() {
        return email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public Person cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public ZonedDateTime getHireDate() {
        return hireDate;
    }

    public Person hireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
    }

    public Boolean isIsEmployee() {
        return isEmployee;
    }

    public Person isEmployee(Boolean isEmployee) {
        this.isEmployee = isEmployee;
        return this;
    }

    public void setIsEmployee(Boolean isEmployee) {
        this.isEmployee = isEmployee;
    }

    public Boolean isIsDentist() {
        return isDentist;
    }

    public Person isDentist(Boolean isDentist) {
        this.isDentist = isDentist;
        return this;
    }

    public void setIsDentist(Boolean isDentist) {
        this.isDentist = isDentist;
    }

    public Boolean isIsPatient() {
        return isPatient;
    }

    public Person isPatient(Boolean isPatient) {
        this.isPatient = isPatient;
        return this;
    }

    public void setIsPatient(Boolean isPatient) {
        this.isPatient = isPatient;
    }

    public Anamnesis getAnamnesis() {
        return anamnesis;
    }

    public Person anamnesis(Anamnesis anamnesis) {
        this.anamnesis = anamnesis;
        return this;
    }

    public void setAnamnesis(Anamnesis anamnesis) {
        this.anamnesis = anamnesis;
    }

    public Appointment getDentist() {
        return dentist;
    }

    public Person dentist(Appointment appointment) {
        this.dentist = appointment;
        return this;
    }

    public void setDentist(Appointment appointment) {
        this.dentist = appointment;
    }

    public Appointment getPatient() {
        return patient;
    }

    public Person patient(Appointment appointment) {
        this.patient = appointment;
        return this;
    }

    public void setPatient(Appointment appointment) {
        this.patient = appointment;
    }

    public Appointment getEmployee() {
        return employee;
    }

    public Person employee(Appointment appointment) {
        this.employee = appointment;
        return this;
    }

    public void setEmployee(Appointment appointment) {
        this.employee = appointment;
    }

    public PersonAddress getPerson() {
        return person;
    }

    public Person person(PersonAddress personAddress) {
        this.person = personAddress;
        return this;
    }

    public void setPerson(PersonAddress personAddress) {
        this.person = personAddress;
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
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
