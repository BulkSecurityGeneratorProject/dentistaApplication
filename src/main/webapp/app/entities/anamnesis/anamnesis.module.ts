import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../../shared';
import {
    AnamnesisService,
    AnamnesisPopupService,
    AnamnesisComponent,
    AnamnesisDetailComponent,
    AnamnesisDialogComponent,
    AnamnesisPopupComponent,
    AnamnesisDeletePopupComponent,
    AnamnesisDeleteDialogComponent,
    anamnesisRoute,
    anamnesisPopupRoute,
    AnamnesisResolvePagingParams,
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
        AnamnesisComponent,
        AnamnesisDetailComponent,
        AnamnesisDialogComponent,
        AnamnesisDeleteDialogComponent,
        AnamnesisPopupComponent,
        AnamnesisDeletePopupComponent,
    ],
    entryComponents: [
        AnamnesisComponent,
        AnamnesisDialogComponent,
        AnamnesisPopupComponent,
        AnamnesisDeleteDialogComponent,
        AnamnesisDeletePopupComponent,
    ],
    providers: [
        AnamnesisService,
        AnamnesisPopupService,
        AnamnesisResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationAnamnesisModule {}
