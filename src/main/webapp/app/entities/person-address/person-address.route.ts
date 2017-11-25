import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonAddressComponent } from './person-address.component';
import { PersonAddressDetailComponent } from './person-address-detail.component';
import { PersonAddressPopupComponent } from './person-address-dialog.component';
import { PersonAddressDeletePopupComponent } from './person-address-delete-dialog.component';

@Injectable()
export class PersonAddressResolvePagingParams implements Resolve<any> {

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
        path: 'person-address',
        component: PersonAddressComponent,
        resolve: {
            'pagingParams': PersonAddressResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-address/:id',
        component: PersonAddressDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personAddressPopupRoute: Routes = [
    {
        path: 'person-address-new',
        component: PersonAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-address/:id/edit',
        component: PersonAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-address/:id/delete',
        component: PersonAddressDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dentistApplicationApp.personAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
