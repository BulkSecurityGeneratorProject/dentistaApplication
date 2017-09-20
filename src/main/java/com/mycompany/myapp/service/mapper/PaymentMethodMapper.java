package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PaymentMethodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PaymentMethod and its DTO PaymentMethodDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentMethodMapper extends EntityMapper <PaymentMethodDTO, PaymentMethod> {
    
    
    default PaymentMethod fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setId(id);
        return paymentMethod;
    }
}
