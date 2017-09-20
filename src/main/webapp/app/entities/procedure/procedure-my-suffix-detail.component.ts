import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProcedureMySuffix } from './procedure-my-suffix.model';
import { ProcedureMySuffixService } from './procedure-my-suffix.service';

@Component({
    selector: 'jhi-procedure-my-suffix-detail',
    templateUrl: './procedure-my-suffix-detail.component.html'
})
export class ProcedureMySuffixDetailComponent implements OnInit, OnDestroy {

    procedure: ProcedureMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private procedureService: ProcedureMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProcedures();
    }

    load(id) {
        this.procedureService.find(id).subscribe((procedure) => {
            this.procedure = procedure;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProcedures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'procedureListModification',
            (response) => this.load(this.procedure.id)
        );
    }
}
