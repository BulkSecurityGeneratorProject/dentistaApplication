import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Anamnesis } from './anamnesis.model';
import { AnamnesisService } from './anamnesis.service';

@Component({
    selector: 'jhi-anamnesis-detail',
    templateUrl: './anamnesis-detail.component.html'
})
export class AnamnesisDetailComponent implements OnInit, OnDestroy {

    anamnesis: Anamnesis;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private anamnesisService: AnamnesisService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAnamneses();
    }

    load(id) {
        this.anamnesisService.find(id).subscribe((anamnesis) => {
            this.anamnesis = anamnesis;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAnamneses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'anamnesisListModification',
            (response) => this.load(this.anamnesis.id)
        );
    }
}
