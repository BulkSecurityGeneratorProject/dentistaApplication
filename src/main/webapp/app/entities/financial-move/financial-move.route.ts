import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FinancialMoveComponent } from './financial-move.component';
import { FinancialMoveDetailComponent } from './financial-move-detail.component';
import { FinancialMovePopupComponent } from './financial-move-dialog.component';
import { FinancialMoveDeletePopupComponent } from './financial-move-delete-dialog.component';

@Injectable()
export class FinancialMoveResolvePagingParams implements Resolve<any> {

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
        path: 'financial-move',
        component: FinancialMoveComponent,
        resolve: {
            'pagingParams': FinancialMoveResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'financial-move/:id',
        component: FinancialMoveDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const financialMovePopupRoute: Routes = [
    {
        path: 'financial-move-new',
        component: FinancialMovePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'financial-move/:id/edit',
        component: FinancialMovePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'financial-move/:id/delete',
        component: FinancialMoveDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.financialMove.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
