import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnamnesisComponent } from './anamnesis.component';
import { AnamnesisDetailComponent } from './anamnesis-detail.component';
import { AnamnesisPopupComponent } from './anamnesis-dialog.component';
import { AnamnesisDeletePopupComponent } from './anamnesis-delete-dialog.component';

@Injectable()
export class AnamnesisResolvePagingParams implements Resolve<any> {

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

export const anamnesisRoute: Routes = [
    {
        path: 'anamnesis',
        component: AnamnesisComponent,
        resolve: {
            'pagingParams': AnamnesisResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'anamnesis/:id',
        component: AnamnesisDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anamnesisPopupRoute: Routes = [
    {
        path: 'anamnesis-new',
        component: AnamnesisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anamnesis/:id/edit',
        component: AnamnesisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anamnesis/:id/delete',
        component: AnamnesisDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
