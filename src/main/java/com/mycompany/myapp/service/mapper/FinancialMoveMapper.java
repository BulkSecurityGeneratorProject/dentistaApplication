package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.FinancialMoveDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FinancialMove and its DTO FinancialMoveDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FinancialMoveMapper extends EntityMapper <FinancialMoveDTO, FinancialMove> {
    
    
    default FinancialMove fromId(Long id) {
        if (id == null) {
            return null;
        }
        FinancialMove financialMove = new FinancialMove();
        financialMove.setId(id);
        return financialMove;
    }
}
