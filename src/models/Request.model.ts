import { Method, _Headers, Body } from "./api.types";
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4008/api';

interface Props {
    url: string;
    method?: Method;
    headers: _Headers,
    body?: Body
}

export default class BaseRequestModel implements Props {
    constructor(public url: string, public method: Method, public headers: _Headers, public body?: Body) {
        this.url = url;
        this.method = method || "GET";
        this.headers = headers || {};
        this.body = body;
    }

    request(): Observable<unknown> {
        return new Observable(observer => {
            fetch(
                `${baseUrl}${this.url}`,
                {
                    method: this.method,
                    headers: this.headers,
                    body: JSON.stringify(this.body)
                }).then((r: any) => {
                return r.json()
            }).then((data: any) => {
                observer.next(data);
                observer.complete();
            }).catch((e: any) => {
                observer.error(e);
            })
            return () => {
                // clean up on unsubscribe
            }
        });
    }
}
