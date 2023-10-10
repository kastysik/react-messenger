import { Observable } from 'rxjs';
import BaseRequestModel from 'models/Request.model';

export const ApiService = {
    // get request
    get: (route: string): Observable<unknown> => {
        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        const newBase = new BaseRequestModel(route, 'GET', headers);
        return newBase.request();
    },
    // post request
    post: (route: string, form: any): Observable<unknown> => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
        const newBase = new BaseRequestModel(route, 'POST', headers, form);
        return newBase.request();
    },
}
