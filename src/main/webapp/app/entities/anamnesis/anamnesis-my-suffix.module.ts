import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    AnamnesisMySuffixService,
    AnamnesisMySuffixPopupService,
    AnamnesisMySuffixComponent,
    AnamnesisMySuffixDetailComponent,
    AnamnesisMySuffixDialogComponent,
    AnamnesisMySuffixPopupComponent,
    AnamnesisMySuffixDeletePopupComponent,
    AnamnesisMySuffixDeleteDialogComponent,
    anamnesisRoute,
    anamnesisPopupRoute,
    AnamnesisMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...anamnesisRoute,
    ...anamnesisPopupRoute,
];

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnamnesisMySuffixComponent,
        AnamnesisMySuffixDetailComponent,
        AnamnesisMySuffixDialogComponent,
        AnamnesisMySuffixDeleteDialogComponent,
        AnamnesisMySuffixPopupComponent,
        AnamnesisMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AnamnesisMySuffixComponent,
        AnamnesisMySuffixDialogComponent,
        AnamnesisMySuffixPopupComponent,
        AnamnesisMySuffixDeleteDialogComponent,
        AnamnesisMySuffixDeletePopupComponent,
    ],
    providers: [
        AnamnesisMySuffixService,
        AnamnesisMySuffixPopupService,
        AnamnesisMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationAnamnesisMySuffixModule {}
