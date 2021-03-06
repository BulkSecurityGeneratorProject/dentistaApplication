import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Person } from './person.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PersonService {

    private resourceUrl = SERVER_API_URL + 'api/people';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(person: Person): Observable<Person> {
        const copy = this.convert(person);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(person: Person): Observable<Person> {
        const copy = this.convert(person);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Person> {
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

    queryByDentist(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('/api/peopleDentist', options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByPatient(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('/api/peoplePatient', options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByEmployee(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('/api/peopleEmployee', options)
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
        entity.hireDate = this.dateUtils
            .convertDateTimeFromServer(entity.hireDate);
    }

    private convert(person: Person): Person {
        const copy: Person = Object.assign({}, person);

        copy.hireDate = this.dateUtils.toDate(person.hireDate);
        return copy;
    }
}
