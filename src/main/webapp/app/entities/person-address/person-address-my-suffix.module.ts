import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    PersonAddressMySuffixService,
    PersonAddressMySuffixPopupService,
    PersonAddressMySuffixComponent,
    PersonAddressMySuffixDetailComponent,
    PersonAddressMySuffixDialogComponent,
    PersonAddressMySuffixPopupComponent,
    PersonAddressMySuffixDeletePopupComponent,
    PersonAddressMySuffixDeleteDialogComponent,
    personAddressRoute,
    personAddressPopupRoute,
    PersonAddressMySuffixResolvePagingParams,
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
        PersonAddressMySuffixComponent,
        PersonAddressMySuffixDetailComponent,
        PersonAddressMySuffixDialogComponent,
        PersonAddressMySuffixDeleteDialogComponent,
        PersonAddressMySuffixPopupComponent,
        PersonAddressMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PersonAddressMySuffixComponent,
        PersonAddressMySuffixDialogComponent,
        PersonAddressMySuffixPopupComponent,
        PersonAddressMySuffixDeleteDialogComponent,
        PersonAddressMySuffixDeletePopupComponent,
    ],
    providers: [
        PersonAddressMySuffixService,
        PersonAddressMySuffixPopupService,
        PersonAddressMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationPersonAddressMySuffixModule {}
