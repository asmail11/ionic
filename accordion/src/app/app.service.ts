import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  findAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/findAllApplications`);
  }
}
