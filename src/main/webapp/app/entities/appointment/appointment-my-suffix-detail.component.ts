import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentMySuffix } from './appointment-my-suffix.model';
import { AppointmentMySuffixService } from './appointment-my-suffix.service';

@Component({
    selector: 'jhi-appointment-my-suffix-detail',
    templateUrl: './appointment-my-suffix-detail.component.html'
})
export class AppointmentMySuffixDetailComponent implements OnInit, OnDestroy {

    appointment: AppointmentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appointmentService: AppointmentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAppointments();
    }

    load(id) {
        this.appointmentService.find(id).subscribe((appointment) => {
            this.appointment = appointment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAppointments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'appointmentListModification',
            (response) => this.load(this.appointment.id)
        );
    }
}
