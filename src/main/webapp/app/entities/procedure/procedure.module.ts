import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    ProcedureService,
    ProcedurePopupService,
    ProcedureComponent,
    ProcedureDetailComponent,
    ProcedureDialogComponent,
    ProcedurePopupComponent,
    ProcedureDeletePopupComponent,
    ProcedureDeleteDialogComponent,
    procedureRoute,
    procedurePopupRoute,
    ProcedureResolvePagingParams,
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
        ProcedureComponent,
        ProcedureDetailComponent,
        ProcedureDialogComponent,
        ProcedureDeleteDialogComponent,
        ProcedurePopupComponent,
        ProcedureDeletePopupComponent,
    ],
    entryComponents: [
        ProcedureComponent,
        ProcedureDialogComponent,
        ProcedurePopupComponent,
        ProcedureDeleteDialogComponent,
        ProcedureDeletePopupComponent,
    ],
    providers: [
        ProcedureService,
        ProcedurePopupService,
        ProcedureResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationProcedureModule {}
