/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FinancialMoveDetailComponent } from '../../../../../../main/webapp/app/entities/financial-move/financial-move-detail.component';
import { FinancialMoveService } from '../../../../../../main/webapp/app/entities/financial-move/financial-move.service';
import { FinancialMove } from '../../../../../../main/webapp/app/entities/financial-move/financial-move.model';

describe('Component Tests', () => {

    describe('FinancialMove Management Detail Component', () => {
        let comp: FinancialMoveDetailComponent;
        let fixture: ComponentFixture<FinancialMoveDetailComponent>;
        let service: FinancialMoveService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [FinancialMoveDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FinancialMoveService,
                    JhiEventManager
                ]
            }).overrideTemplate(FinancialMoveDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FinancialMoveDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FinancialMoveService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FinancialMove(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.financialMove).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
