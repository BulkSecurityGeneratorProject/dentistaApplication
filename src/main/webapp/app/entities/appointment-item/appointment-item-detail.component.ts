import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentItem } from './appointment-item.model';
import { AppointmentItemService } from './appointment-item.service';

@Component({
    selector: 'jhi-appointment-item-detail',
    templateUrl: './appointment-item-detail.component.html'
})
export class AppointmentItemDetailComponent implements OnInit, OnDestroy {

    appointmentItem: AppointmentItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appointmentItemService: AppointmentItemService,
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
