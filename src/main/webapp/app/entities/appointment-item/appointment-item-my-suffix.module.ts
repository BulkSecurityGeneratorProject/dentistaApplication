import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    AppointmentItemMySuffixService,
    AppointmentItemMySuffixPopupService,
    AppointmentItemMySuffixComponent,
    AppointmentItemMySuffixDetailComponent,
    AppointmentItemMySuffixDialogComponent,
    AppointmentItemMySuffixPopupComponent,
    AppointmentItemMySuffixDeletePopupComponent,
    AppointmentItemMySuffixDeleteDialogComponent,
    appointmentItemRoute,
    appointmentItemPopupRoute,
    AppointmentItemMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...appointmentItemRoute,
    ...appointmentItemPopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AppointmentItemMySuffixComponent,
        AppointmentItemMySuffixDetailComponent,
        AppointmentItemMySuffixDialogComponent,
        AppointmentItemMySuffixDeleteDialogComponent,
        AppointmentItemMySuffixPopupComponent,
        AppointmentItemMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AppointmentItemMySuffixComponent,
        AppointmentItemMySuffixDialogComponent,
        AppointmentItemMySuffixPopupComponent,
        AppointmentItemMySuffixDeleteDialogComponent,
        AppointmentItemMySuffixDeletePopupComponent,
    ],
    providers: [
        AppointmentItemMySuffixService,
        AppointmentItemMySuffixPopupService,
        AppointmentItemMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationAppointmentItemMySuffixModule {}
