import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    AppointmentItemService,
    AppointmentItemPopupService,
    AppointmentItemComponent,
    AppointmentItemDetailComponent,
    AppointmentItemDialogComponent,
    AppointmentItemPopupComponent,
    AppointmentItemDeletePopupComponent,
    AppointmentItemDeleteDialogComponent,
    appointmentItemRoute,
    appointmentItemPopupRoute,
    AppointmentItemResolvePagingParams,
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
        AppointmentItemComponent,
        AppointmentItemDetailComponent,
        AppointmentItemDialogComponent,
        AppointmentItemDeleteDialogComponent,
        AppointmentItemPopupComponent,
        AppointmentItemDeletePopupComponent,
    ],
    entryComponents: [
        AppointmentItemComponent,
        AppointmentItemDialogComponent,
        AppointmentItemPopupComponent,
        AppointmentItemDeleteDialogComponent,
        AppointmentItemDeletePopupComponent,
    ],
    providers: [
        AppointmentItemService,
        AppointmentItemPopupService,
        AppointmentItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationAppointmentItemModule {}
