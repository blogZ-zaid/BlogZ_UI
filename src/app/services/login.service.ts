import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.backend.baseURL;


  login(userData: any) {
    return this.http.post(`${this.baseUrl}` + '/login', userData)
  }
}
