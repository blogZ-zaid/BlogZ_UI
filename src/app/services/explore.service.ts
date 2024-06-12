import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.backend.baseURL;

  getAllUsers(userId:string): Observable<any> {
    const url = `${this.baseUrl}/getAllUsers`; 
    const params = new HttpParams().set('userId', userId); 
    return this.http.get(url, { params });
  }
}
