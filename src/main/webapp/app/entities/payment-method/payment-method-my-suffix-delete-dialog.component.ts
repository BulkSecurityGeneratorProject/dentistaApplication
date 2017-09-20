import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentMethodMySuffix } from './payment-method-my-suffix.model';
import { PaymentMethodMySuffixPopupService } from './payment-method-my-suffix-popup.service';
import { PaymentMethodMySuffixService } from './payment-method-my-suffix.service';

@Component({
    selector: 'jhi-payment-method-my-suffix-delete-dialog',
    templateUrl: './payment-method-my-suffix-delete-dialog.component.html'
})
export class PaymentMethodMySuffixDeleteDialogComponent {

    paymentMethod: PaymentMethodMySuffix;

    constructor(
        private paymentMethodService: PaymentMethodMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paymentMethodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paymentMethodListModification',
                content: 'Deleted an paymentMethod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payment-method-my-suffix-delete-popup',
    template: ''
})
export class PaymentMethodMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentMethodPopupService: PaymentMethodMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paymentMethodPopupService
                .open(PaymentMethodMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
