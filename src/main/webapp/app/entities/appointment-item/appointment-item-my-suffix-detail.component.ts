import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentItemMySuffix } from './appointment-item-my-suffix.model';
import { AppointmentItemMySuffixService } from './appointment-item-my-suffix.service';

@Component({
    selector: 'jhi-appointment-item-my-suffix-detail',
    templateUrl: './appointment-item-my-suffix-detail.component.html'
})
export class AppointmentItemMySuffixDetailComponent implements OnInit, OnDestroy {

    appointmentItem: AppointmentItemMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appointmentItemService: AppointmentItemMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAppointmentItems();
    }

    load(id) {
        this.appointmentItemService.find(id).subscribe((appointmentItem) => {
            this.appointmentItem = appointmentItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAppointmentItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'appointmentItemListModification',
            (response) => this.load(this.appointmentItem.id)
        );
    }
}
