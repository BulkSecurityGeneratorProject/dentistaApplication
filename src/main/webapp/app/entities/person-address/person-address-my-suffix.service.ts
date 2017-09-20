import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PersonAddressMySuffix } from './person-address-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PersonAddressMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/person-addresses';

    constructor(private http: Http) { }

    create(personAddress: PersonAddressMySuffix): Observable<PersonAddressMySuffix> {
        const copy = this.convert(personAddress);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(personAddress: PersonAddressMySuffix): Observable<PersonAddressMySuffix> {
        const copy = this.convert(personAddress);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<PersonAddressMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(personAddress: PersonAddressMySuffix): PersonAddressMySuffix {
        const copy: PersonAddressMySuffix = Object.assign({}, personAddress);
        return copy;
    }
}
