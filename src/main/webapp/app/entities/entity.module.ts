import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DentistApplicationPersonMySuffixModule } from './person/person-my-suffix.module';
import { DentistApplicationPersonAddressMySuffixModule } from './person-address/person-address-my-suffix.module';
import { DentistApplicationAppointmentMySuffixModule } from './appointment/appointment-my-suffix.module';
import { DentistApplicationAppointmentItemMySuffixModule } from './appointment-item/appointment-item-my-suffix.module';
import { DentistApplicationProcedureMySuffixModule } from './procedure/procedure-my-suffix.module';
import { DentistApplicationPaymentMethodMySuffixModule } from './payment-method/payment-method-my-suffix.module';
import { DentistApplicationAnamnesisMySuffixModule } from './anamnesis/anamnesis-my-suffix.module';
import { DentistApplicationFinancialMoveMySuffixModule } from './financial-move/financial-move-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DentistApplicationPersonMySuffixModule,
        DentistApplicationPersonAddressMySuffixModule,
        DentistApplicationAppointmentMySuffixModule,
        DentistApplicationAppointmentItemMySuffixModule,
        DentistApplicationProcedureMySuffixModule,
        DentistApplicationPaymentMethodMySuffixModule,
        DentistApplicationAnamnesisMySuffixModule,
        DentistApplicationFinancialMoveMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationEntityModule {}
