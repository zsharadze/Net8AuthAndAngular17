import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getWeather() {
    return this.http.get(this.apiUrl + '/weatherforecast');
  }
}
