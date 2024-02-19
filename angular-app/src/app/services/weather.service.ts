import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIurls } from '../urls';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    constructor(private http: HttpClient) {
        this.http = http;
    }

    getWeather(): Observable<any> {
        return this.http.get<any>(APIurls.getWeather);
    }
}