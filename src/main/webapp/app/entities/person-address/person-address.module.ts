import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    PersonAddressService,
    PersonAddressPopupService,
    PersonAddressComponent,
    PersonAddressDetailComponent,
    PersonAddressDialogComponent,
    PersonAddressPopupComponent,
    PersonAddressDeletePopupComponent,
    PersonAddressDeleteDialogComponent,
    personAddressRoute,
    personAddressPopupRoute,
    PersonAddressResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personAddressRoute,
    ...personAddressPopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonAddressComponent,
        PersonAddressDetailComponent,
        PersonAddressDialogComponent,
        PersonAddressDeleteDialogComponent,
        PersonAddressPopupComponent,
        PersonAddressDeletePopupComponent,
    ],
    entryComponents: [
        PersonAddressComponent,
        PersonAddressDialogComponent,
        PersonAddressPopupComponent,
        PersonAddressDeleteDialogComponent,
        PersonAddressDeletePopupComponent,
    ],
    providers: [
        PersonAddressService,
        PersonAddressPopupService,
        PersonAddressResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationPersonAddressModule {}
