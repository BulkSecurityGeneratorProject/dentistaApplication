import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    FinancialMoveService,
    FinancialMovePopupService,
    FinancialMoveComponent,
    FinancialMoveDetailComponent,
    FinancialMoveDialogComponent,
    FinancialMovePopupComponent,
    FinancialMoveDeletePopupComponent,
    FinancialMoveDeleteDialogComponent,
    financialMoveRoute,
    financialMovePopupRoute,
    FinancialMoveResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...financialMoveRoute,
    ...financialMovePopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FinancialMoveComponent,
        FinancialMoveDetailComponent,
        FinancialMoveDialogComponent,
        FinancialMoveDeleteDialogComponent,
        FinancialMovePopupComponent,
        FinancialMoveDeletePopupComponent,
    ],
    entryComponents: [
        FinancialMoveComponent,
        FinancialMoveDialogComponent,
        FinancialMovePopupComponent,
        FinancialMoveDeleteDialogComponent,
        FinancialMoveDeletePopupComponent,
    ],
    providers: [
        FinancialMoveService,
        FinancialMovePopupService,
        FinancialMoveResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationFinancialMoveModule {}
