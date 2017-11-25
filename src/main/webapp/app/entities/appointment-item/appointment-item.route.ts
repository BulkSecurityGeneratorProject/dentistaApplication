import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AppointmentItemComponent } from './appointment-item.component';
import { AppointmentItemDetailComponent } from './appointment-item-detail.component';
import { AppointmentItemPopupComponent } from './appointment-item-dialog.component';
import { AppointmentItemDeletePopupComponent } from './appointment-item-delete-dialog.component';

@Injectable()
export class AppointmentItemResolvePagingParams implements Resolve<any> {

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

export const appointmentItemRoute: Routes = [
    {
        path: 'appointment-item',
        component: AppointmentItemComponent,
        resolve: {
            'pagingParams': AppointmentItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'appointment-item/:id',
        component: AppointmentItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentItemPopupRoute: Routes = [
    {
        path: 'appointment-item-new',
        component: AppointmentItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-item/:id/edit',
        component: AppointmentItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-item/:id/delete',
        component: AppointmentItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
