import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonAddressMySuffixComponent } from './person-address-my-suffix.component';
import { PersonAddressMySuffixDetailComponent } from './person-address-my-suffix-detail.component';
import { PersonAddressMySuffixPopupComponent } from './person-address-my-suffix-dialog.component';
import { PersonAddressMySuffixDeletePopupComponent } from './person-address-my-suffix-delete-dialog.component';

@Injectable()
export class PersonAddressMySuffixResolvePagingParams implements Resolve<any> {

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

export const personAddressRoute: Routes = [
    {
        path: 'person-address-my-suffix',
        component: PersonAddressMySuffixComponent,
        resolve: {
            'pagingParams': PersonAddressMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-address-my-suffix/:id',
        component: PersonAddressMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personAddressPopupRoute: Routes = [
    {
        path: 'person-address-my-suffix-new',
        component: PersonAddressMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-address-my-suffix/:id/edit',
        component: PersonAddressMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-address-my-suffix/:id/delete',
        component: PersonAddressMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
