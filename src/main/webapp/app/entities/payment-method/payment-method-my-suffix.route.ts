import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PaymentMethodMySuffixComponent } from './payment-method-my-suffix.component';
import { PaymentMethodMySuffixDetailComponent } from './payment-method-my-suffix-detail.component';
import { PaymentMethodMySuffixPopupComponent } from './payment-method-my-suffix-dialog.component';
import { PaymentMethodMySuffixDeletePopupComponent } from './payment-method-my-suffix-delete-dialog.component';

@Injectable()
export class PaymentMethodMySuffixResolvePagingParams implements Resolve<any> {

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

export const paymentMethodRoute: Routes = [
    {
        path: 'payment-method-my-suffix',
        component: PaymentMethodMySuffixComponent,
        resolve: {
            'pagingParams': PaymentMethodMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-method-my-suffix/:id',
        component: PaymentMethodMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentMethodPopupRoute: Routes = [
    {
        path: 'payment-method-my-suffix-new',
        component: PaymentMethodMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-method-my-suffix/:id/edit',
        component: PaymentMethodMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-method-my-suffix/:id/delete',
        component: PaymentMethodMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.paymentMethod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
