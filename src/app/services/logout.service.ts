import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) {}

  baseUrl: string = environment.backend.baseURL;

 

  logout() {
    return this.http.get(`${this.baseUrl}/logout`, { withCredentials: true });
  }
}
