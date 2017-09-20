import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AnamnesisMySuffixComponent } from './anamnesis-my-suffix.component';
import { AnamnesisMySuffixDetailComponent } from './anamnesis-my-suffix-detail.component';
import { AnamnesisMySuffixPopupComponent } from './anamnesis-my-suffix-dialog.component';
import { AnamnesisMySuffixDeletePopupComponent } from './anamnesis-my-suffix-delete-dialog.component';

@Injectable()
export class AnamnesisMySuffixResolvePagingParams implements Resolve<any> {

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
        path: 'anamnesis-my-suffix',
        component: AnamnesisMySuffixComponent,
        resolve: {
            'pagingParams': AnamnesisMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'anamnesis-my-suffix/:id',
        component: AnamnesisMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anamnesisPopupRoute: Routes = [
    {
        path: 'anamnesis-my-suffix-new',
        component: AnamnesisMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anamnesis-my-suffix/:id/edit',
        component: AnamnesisMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anamnesis-my-suffix/:id/delete',
        component: AnamnesisMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.anamnesis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
