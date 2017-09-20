import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    FinancialMoveMySuffixService,
    FinancialMoveMySuffixPopupService,
    FinancialMoveMySuffixComponent,
    FinancialMoveMySuffixDetailComponent,
    FinancialMoveMySuffixDialogComponent,
    FinancialMoveMySuffixPopupComponent,
    FinancialMoveMySuffixDeletePopupComponent,
    FinancialMoveMySuffixDeleteDialogComponent,
    financialMoveRoute,
    financialMovePopupRoute,
    FinancialMoveMySuffixResolvePagingParams,
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
        FinancialMoveMySuffixComponent,
        FinancialMoveMySuffixDetailComponent,
        FinancialMoveMySuffixDialogComponent,
        FinancialMoveMySuffixDeleteDialogComponent,
        FinancialMoveMySuffixPopupComponent,
        FinancialMoveMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FinancialMoveMySuffixComponent,
        FinancialMoveMySuffixDialogComponent,
        FinancialMoveMySuffixPopupComponent,
        FinancialMoveMySuffixDeleteDialogComponent,
        FinancialMoveMySuffixDeletePopupComponent,
    ],
    providers: [
        FinancialMoveMySuffixService,
        FinancialMoveMySuffixPopupService,
        FinancialMoveMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationFinancialMoveMySuffixModule {}
