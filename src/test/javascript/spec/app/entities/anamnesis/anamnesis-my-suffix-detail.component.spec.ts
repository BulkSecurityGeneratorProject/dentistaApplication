/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AnamnesisMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis-my-suffix-detail.component';
import { AnamnesisMySuffixService } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis-my-suffix.service';
import { AnamnesisMySuffix } from '../../../../../../main/webapp/app/entities/anamnesis/anamnesis-my-suffix.model';

describe('Component Tests', () => {

    describe('AnamnesisMySuffix Management Detail Component', () => {
        let comp: AnamnesisMySuffixDetailComponent;
        let fixture: ComponentFixture<AnamnesisMySuffixDetailComponent>;
        let service: AnamnesisMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [AnamnesisMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AnamnesisMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AnamnesisMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnamnesisMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnamnesisMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AnamnesisMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.anamnesis).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
