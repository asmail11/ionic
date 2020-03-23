import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from '../model/Student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8081//api/student';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/findAll`);
}
}
