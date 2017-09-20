package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FinancialMove;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the FinancialMove entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinancialMoveRepository extends JpaRepository<FinancialMove, Long> {

}
