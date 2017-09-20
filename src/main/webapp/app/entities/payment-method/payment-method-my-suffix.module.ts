import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    PaymentMethodMySuffixService,
    PaymentMethodMySuffixPopupService,
    PaymentMethodMySuffixComponent,
    PaymentMethodMySuffixDetailComponent,
    PaymentMethodMySuffixDialogComponent,
    PaymentMethodMySuffixPopupComponent,
    PaymentMethodMySuffixDeletePopupComponent,
    PaymentMethodMySuffixDeleteDialogComponent,
    paymentMethodRoute,
    paymentMethodPopupRoute,
    PaymentMethodMySuffixResolvePagingParams,
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
        PaymentMethodMySuffixComponent,
        PaymentMethodMySuffixDetailComponent,
        PaymentMethodMySuffixDialogComponent,
        PaymentMethodMySuffixDeleteDialogComponent,
        PaymentMethodMySuffixPopupComponent,
        PaymentMethodMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PaymentMethodMySuffixComponent,
        PaymentMethodMySuffixDialogComponent,
        PaymentMethodMySuffixPopupComponent,
        PaymentMethodMySuffixDeleteDialogComponent,
        PaymentMethodMySuffixDeletePopupComponent,
    ],
    providers: [
        PaymentMethodMySuffixService,
        PaymentMethodMySuffixPopupService,
        PaymentMethodMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationPaymentMethodMySuffixModule {}
