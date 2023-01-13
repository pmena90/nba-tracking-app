import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  get<returnType>(url: string, params?: HttpParams): Observable<returnType> {
    return this.http
      .get<returnType>(url, { params, observe: 'response' })
      .pipe(
        map((res) => res.body as returnType));
  }
}
