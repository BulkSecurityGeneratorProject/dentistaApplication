/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AppointmentItemDetailComponent } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item-detail.component';
import { AppointmentItemService } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item.service';
import { AppointmentItem } from '../../../../../../main/webapp/app/entities/appointment-item/appointment-item.model';

describe('Component Tests', () => {

    describe('AppointmentItem Management Detail Component', () => {
        let comp: AppointmentItemDetailComponent;
        let fixture: ComponentFixture<AppointmentItemDetailComponent>;
        let service: AppointmentItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [AppointmentItemDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AppointmentItemService,
                    JhiEventManager
                ]
            }).overrideTemplate(AppointmentItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppointmentItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppointmentItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AppointmentItem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.appointmentItem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
