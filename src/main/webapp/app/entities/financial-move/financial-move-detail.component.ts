import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FinancialMove } from './financial-move.model';
import { FinancialMoveService } from './financial-move.service';

@Component({
    selector: 'jhi-financial-move-detail',
    templateUrl: './financial-move-detail.component.html'
})
export class FinancialMoveDetailComponent implements OnInit, OnDestroy {

    financialMove: FinancialMove;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private financialMoveService: FinancialMoveService,
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
