/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AnamnesisDetailComponent } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis-detail.component';
import { AnamnesisService } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis.service';
import { Anamnesis } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis.model';

describe('Component Tests', () => {

    describe('Anamnesis Management Detail Component', () => {
        let comp: AnamnesisDetailComponent;
        let fixture: ComponentFixture<AnamnesisDetailComponent>;
        let service: AnamnesisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [AnamnesisDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AnamnesisService,
                    JhiEventManager
                ]
            }).overrideTemplate(AnamnesisDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnamnesisDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnamnesisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Anamnesis(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.anamnesis).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
