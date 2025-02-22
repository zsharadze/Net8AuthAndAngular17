import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../models/register.model';

@Injectable()
export class AuthService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {
    this.http = http;
  }

  login(loginModel: LoginModel) {
    return this.http.post(this.apiUrl + '/identity/login', loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.http.post(this.apiUrl + '/identity/register', registerModel);
  }
}
