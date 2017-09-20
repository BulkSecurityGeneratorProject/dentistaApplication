import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FinancialMoveMySuffix } from './financial-move-my-suffix.model';
import { FinancialMoveMySuffixService } from './financial-move-my-suffix.service';

@Component({
    selector: 'jhi-financial-move-my-suffix-detail',
    templateUrl: './financial-move-my-suffix-detail.component.html'
})
export class FinancialMoveMySuffixDetailComponent implements OnInit, OnDestroy {

    financialMove: FinancialMoveMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private financialMoveService: FinancialMoveMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFinancialMoves();
    }

    load(id) {
        this.financialMoveService.find(id).subscribe((financialMove) => {
            this.financialMove = financialMove;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFinancialMoves() {
        this.eventSubscriber = this.eventManager.subscribe(
            'financialMoveListModification',
            (response) => this.load(this.financialMove.id)
        );
    }
}
