/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DentistApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PaymentMethodMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-my-suffix-detail.component';
import { PaymentMethodMySuffixService } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-my-suffix.service';
import { PaymentMethodMySuffix } from '../../../../../../main/webapp/app/entities/payment-method/payment-method-my-suffix.model';

describe('Component Tests', () => {

    describe('PaymentMethodMySuffix Management Detail Component', () => {
        let comp: PaymentMethodMySuffixDetailComponent;
        let fixture: ComponentFixture<PaymentMethodMySuffixDetailComponent>;
        let service: PaymentMethodMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DentistApplicationTestModule],
                declarations: [PaymentMethodMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PaymentMethodMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PaymentMethodMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMethodMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMethodMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PaymentMethodMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.paymentMethod).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
