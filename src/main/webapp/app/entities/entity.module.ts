import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DentistApplicationPersonModule } from './person/person.module';
import { DentistApplicationPersonAddressModule } from './person-address/person-address.module';
import { DentistApplicationAppointmentModule } from './appointment/appointment.module';
import { DentistApplicationAppointmentItemModule } from './appointment-item/appointment-item.module';
import { DentistApplicationProcedureModule } from './procedure/procedure.module';
import { DentistApplicationAnamnesisModule } from './anamnesis/anamnesis.module';
import { DentistApplicationPaymentMethodModule } from './payment-method/payment-method.module';
import { DentistApplicationFinancialMoveModule } from './financial-move/financial-move.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DentistApplicationPersonModule,
        DentistApplicationPersonAddressModule,
        DentistApplicationAppointmentModule,
        DentistApplicationAppointmentItemModule,
        DentistApplicationProcedureModule,
        DentistApplicationAnamnesisModule,
        DentistApplicationPaymentMethodModule,
        DentistApplicationFinancialMoveModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationEntityModule {}
