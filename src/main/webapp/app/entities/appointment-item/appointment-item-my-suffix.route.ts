import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AppointmentItemMySuffixComponent } from './appointment-item-my-suffix.component';
import { AppointmentItemMySuffixDetailComponent } from './appointment-item-my-suffix-detail.component';
import { AppointmentItemMySuffixPopupComponent } from './appointment-item-my-suffix-dialog.component';
import { AppointmentItemMySuffixDeletePopupComponent } from './appointment-item-my-suffix-delete-dialog.component';

@Injectable()
export class AppointmentItemMySuffixResolvePagingParams implements Resolve<any> {

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
        path: 'appointment-item-my-suffix',
        component: AppointmentItemMySuffixComponent,
        resolve: {
            'pagingParams': AppointmentItemMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'appointment-item-my-suffix/:id',
        component: AppointmentItemMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentItemPopupRoute: Routes = [
    {
        path: 'appointment-item-my-suffix-new',
        component: AppointmentItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-item-my-suffix/:id/edit',
        component: AppointmentItemMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appointment-item-my-suffix/:id/delete',
        component: AppointmentItemMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.appointmentItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
