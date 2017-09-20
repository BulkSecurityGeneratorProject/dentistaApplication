import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FinancialMoveMySuffixComponent } from './financial-move-my-suffix.component';
import { FinancialMoveMySuffixDetailComponent } from './financial-move-my-suffix-detail.component';
import { FinancialMoveMySuffixPopupComponent } from './financial-move-my-suffix-dialog.component';
import { FinancialMoveMySuffixDeletePopupComponent } from './financial-move-my-suffix-delete-dialog.component';

@Injectable()
export class FinancialMoveMySuffixResolvePagingParams implements Resolve<any> {

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

export const financialMoveRoute: Routes = [
    {
        path: 'financial-move-my-suffix',
        component: FinancialMoveMySuffixComponent,
        resolve: {
            'pagingParams': FinancialMoveMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'financial-move-my-suffix/:id',
        component: FinancialMoveMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const financialMovePopupRoute: Routes = [
    {
        path: 'financial-move-my-suffix-new',
        component: FinancialMoveMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'financial-move-my-suffix/:id/edit',
        component: FinancialMoveMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'financial-move-my-suffix/:id/delete',
        component: FinancialMoveMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
