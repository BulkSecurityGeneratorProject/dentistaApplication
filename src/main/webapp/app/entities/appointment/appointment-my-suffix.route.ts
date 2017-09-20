import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AppointmentMySuffixComponent } from './appointment-my-suffix.component';
import { AppointmentMySuffixDetailComponent } from './appointment-my-suffix-detail.component';
import { AppointmentMySuffixPopupComponent } from './appointment-my-suffix-dialog.component';
import { AppointmentMySuffixDeletePopupComponent } from './appointment-my-suffix-delete-dialog.component';

@Injectable()
export class AppointmentMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const appointmentRoute: Routes = [
    {
        path: 'appointment-my-suffix',
        component: AppointmentMySuffixComponent,
        resolve: {
            'pagingParams': AppointmentMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'appointment-my-suffix/:id',
        component: AppointmentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentPopupRoute: Routes = [
    {
        path: 'appointment-my-suffix-new',
        component: AppointmentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-my-suffix/:id/edit',
        component: AppointmentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-my-suffix/:id/delete',
        component: AppointmentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
