import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FinancialMove } from './financial-move.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FinancialMoveService {

    private resourceUrl = SERVER_API_URL + 'api/financial-moves';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(financialMove: FinancialMove): Observable<FinancialMove> {
        const copy = this.convert(financialMove);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(financialMove: FinancialMove): Observable<FinancialMove> {
        const copy = this.convert(financialMove);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<FinancialMove> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryLastFinancialMoveBalance(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/financial-moves/lastbalance', options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.moveDate = this.dateUtils
            .convertDateTimeFromServer(entity.moveDate);
    }

    private convert(financialMove: FinancialMove): FinancialMove {
        const copy: FinancialMove = Object.assign({}, financialMove);

        copy.moveDate = this.dateUtils.toDate(financialMove.moveDate);
        return copy;
    }
}
