import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentMethodMySuffix } from './payment-method-my-suffix.model';
import { PaymentMethodMySuffixPopupService } from './payment-method-my-suffix-popup.service';
import { PaymentMethodMySuffixService } from './payment-method-my-suffix.service';

@Component({
    selector: 'jhi-payment-method-my-suffix-dialog',
    templateUrl: './payment-method-my-suffix-dialog.component.html'
})
export class PaymentMethodMySuffixDialogComponent implements OnInit {

    paymentMethod: PaymentMethodMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private paymentMethodService: PaymentMethodMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.paymentMethod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paymentMethodService.update(this.paymentMethod));
        } else {
            this.subscribeToSaveResponse(
                this.paymentMethodService.create(this.paymentMethod));
        }
    }

    private subscribeToSaveResponse(result: Observable<PaymentMethodMySuffix>) {
        result.subscribe((res: PaymentMethodMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PaymentMethodMySuffix) {
        this.eventManager.broadcast({ name: 'paymentMethodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-payment-method-my-suffix-popup',
    template: ''
})
export class PaymentMethodMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paymentMethodPopupService: PaymentMethodMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paymentMethodPopupService
                    .open(PaymentMethodMySuffixDialogComponent as Component, params['id']);
            } else {
                this.paymentMethodPopupService
                    .open(PaymentMethodMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
