import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    PaymentMethodService,
    PaymentMethodPopupService,
    PaymentMethodComponent,
    PaymentMethodDetailComponent,
    PaymentMethodDialogComponent,
    PaymentMethodPopupComponent,
    PaymentMethodDeletePopupComponent,
    PaymentMethodDeleteDialogComponent,
    paymentMethodRoute,
    paymentMethodPopupRoute,
    PaymentMethodResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paymentMethodRoute,
    ...paymentMethodPopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PaymentMethodComponent,
        PaymentMethodDetailComponent,
        PaymentMethodDialogComponent,
        PaymentMethodDeleteDialogComponent,
        PaymentMethodPopupComponent,
        PaymentMethodDeletePopupComponent,
    ],
    entryComponents: [
        PaymentMethodComponent,
        PaymentMethodDialogComponent,
        PaymentMethodPopupComponent,
        PaymentMethodDeleteDialogComponent,
        PaymentMethodDeletePopupComponent,
    ],
    providers: [
        PaymentMethodService,
        PaymentMethodPopupService,
        PaymentMethodResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationPaymentMethodModule {}
