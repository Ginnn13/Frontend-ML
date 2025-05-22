import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://697e-34-23-185-125.ngrok-free.app/predict'; //URL de ngrok

  constructor(private http: HttpClient) {}

  getPredictions(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}