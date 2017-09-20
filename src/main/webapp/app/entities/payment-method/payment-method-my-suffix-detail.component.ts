import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMethodMySuffix } from './payment-method-my-suffix.model';
import { PaymentMethodMySuffixService } from './payment-method-my-suffix.service';

@Component({
    selector: 'jhi-payment-method-my-suffix-detail',
    templateUrl: './payment-method-my-suffix-detail.component.html'
})
export class PaymentMethodMySuffixDetailComponent implements OnInit, OnDestroy {

    paymentMethod: PaymentMethodMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paymentMethodService: PaymentMethodMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPaymentMethods();
    }

    load(id) {
        this.paymentMethodService.find(id).subscribe((paymentMethod) => {
            this.paymentMethod = paymentMethod;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPaymentMethods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentMethodListModification',
            (response) => this.load(this.paymentMethod.id)
        );
    }
}
