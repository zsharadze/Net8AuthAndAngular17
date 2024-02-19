import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIurls } from '../urls';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  login(loginModel: LoginModel) {
    // let options = { headers: headers, withCredentials: true };
    let headers = new HttpHeaders({
      Accept: 'application/json',
      enctype: 'multipart/form-data',
    });

    let options = { headers: headers};
    return this.http.post(
      APIurls.login,
      loginModel,
      options
    );
  }

  register(loginModel: LoginModel) {
    let headers = new HttpHeaders({
      Accept: 'application/json',
      enctype: 'multipart/form-data',
    });

    let options = { headers: headers};
    return this.http.post(
      APIurls.register,
      loginModel,
      options
    );
  }
}
