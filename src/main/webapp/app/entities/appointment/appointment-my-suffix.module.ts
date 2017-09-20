import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    AppointmentMySuffixService,
    AppointmentMySuffixPopupService,
    AppointmentMySuffixComponent,
    AppointmentMySuffixDetailComponent,
    AppointmentMySuffixDialogComponent,
    AppointmentMySuffixPopupComponent,
    AppointmentMySuffixDeletePopupComponent,
    AppointmentMySuffixDeleteDialogComponent,
    appointmentRoute,
    appointmentPopupRoute,
    AppointmentMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...appointmentRoute,
    ...appointmentPopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AppointmentMySuffixComponent,
        AppointmentMySuffixDetailComponent,
        AppointmentMySuffixDialogComponent,
        AppointmentMySuffixDeleteDialogComponent,
        AppointmentMySuffixPopupComponent,
        AppointmentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AppointmentMySuffixComponent,
        AppointmentMySuffixDialogComponent,
        AppointmentMySuffixPopupComponent,
        AppointmentMySuffixDeleteDialogComponent,
        AppointmentMySuffixDeletePopupComponent,
    ],
    providers: [
        AppointmentMySuffixService,
        AppointmentMySuffixPopupService,
        AppointmentMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationAppointmentMySuffixModule {}
