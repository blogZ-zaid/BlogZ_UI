import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.backend.baseURL;


  addPost(userData: any) {
    return this.http.post(`${this.baseUrl}` + '/addPost', userData,{withCredentials: true})
  }

  getAllPublicPost(userId:string) {
    const url = `${this.baseUrl}/getAllPublicPost`; 
    const params = new HttpParams().set('userId', userId); 
    return this.http.get(url, { params });
  }
}
