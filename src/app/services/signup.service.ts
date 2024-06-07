import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.backend.baseURL;


  signup(userData: any) {
    return this.http.post(`${this.baseUrl}` + '/signup', userData)
  }

}
