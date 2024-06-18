import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.backend.baseURL;

  getUserProfile(userId:string): Observable<any> {
    const url = `${this.baseUrl}/userProfile`; 
    const params = new HttpParams().set('userId', userId); 
    return this.http.get(url, { params });
  }
}
