import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PersonAddressMySuffix } from './person-address-my-suffix.model';
import { PersonAddressMySuffixService } from './person-address-my-suffix.service';

@Component({
    selector: 'jhi-person-address-my-suffix-detail',
    templateUrl: './person-address-my-suffix-detail.component.html'
})
export class PersonAddressMySuffixDetailComponent implements OnInit, OnDestroy {

    personAddress: PersonAddressMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personAddressService: PersonAddressMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonAddresses();
    }

    load(id) {
        this.personAddressService.find(id).subscribe((personAddress) => {
            this.personAddress = personAddress;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonAddresses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personAddressListModification',
            (response) => this.load(this.personAddress.id)
        );
    }
}
