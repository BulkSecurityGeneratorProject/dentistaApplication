import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProcedureMySuffixComponent } from './procedure-my-suffix.component';
import { ProcedureMySuffixDetailComponent } from './procedure-my-suffix-detail.component';
import { ProcedureMySuffixPopupComponent } from './procedure-my-suffix-dialog.component';
import { ProcedureMySuffixDeletePopupComponent } from './procedure-my-suffix-delete-dialog.component';

@Injectable()
export class ProcedureMySuffixResolvePagingParams implements Resolve<any> {

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

export const procedureRoute: Routes = [
    {
        path: 'procedure-my-suffix',
        component: ProcedureMySuffixComponent,
        resolve: {
            'pagingParams': ProcedureMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'procedure-my-suffix/:id',
        component: ProcedureMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const procedurePopupRoute: Routes = [
    {
        path: 'procedure-my-suffix-new',
        component: ProcedureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'procedure-my-suffix/:id/edit',
        component: ProcedureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'procedure-my-suffix/:id/delete',
        component: ProcedureMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.procedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
