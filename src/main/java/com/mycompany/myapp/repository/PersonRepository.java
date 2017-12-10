package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.service.dto.PersonDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import org.springframework.data.domain.Pageable;
import java.util.List;


/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Page<Person> findAllByIsDentistIsTrue(Pageable pageable);
    Page<Person> findAllByIsPatientIsTrue(Pageable pageable);
    Page<Person> findAllByIsEmployeeIsTrue(Pageable pageable);

}
