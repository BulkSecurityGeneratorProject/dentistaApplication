import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DentistApplicationSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        DentistApplicationSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        NgbModalModule.forRoot(),
        CalendarModule.forRoot(),
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DentistApplicationHomeModule {}
