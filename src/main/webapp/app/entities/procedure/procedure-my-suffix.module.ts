import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    ProcedureMySuffixService,
    ProcedureMySuffixPopupService,
    ProcedureMySuffixComponent,
    ProcedureMySuffixDetailComponent,
    ProcedureMySuffixDialogComponent,
    ProcedureMySuffixPopupComponent,
    ProcedureMySuffixDeletePopupComponent,
    ProcedureMySuffixDeleteDialogComponent,
    procedureRoute,
    procedurePopupRoute,
    ProcedureMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...procedureRoute,
    ...procedurePopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProcedureMySuffixComponent,
        ProcedureMySuffixDetailComponent,
        ProcedureMySuffixDialogComponent,
        ProcedureMySuffixDeleteDialogComponent,
        ProcedureMySuffixPopupComponent,
        ProcedureMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProcedureMySuffixComponent,
        ProcedureMySuffixDialogComponent,
        ProcedureMySuffixPopupComponent,
        ProcedureMySuffixDeleteDialogComponent,
        ProcedureMySuffixDeletePopupComponent,
    ],
    providers: [
        ProcedureMySuffixService,
        ProcedureMySuffixPopupService,
        ProcedureMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationProcedureMySuffixModule {}
