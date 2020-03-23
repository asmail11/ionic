import { Component, OnInit } from '@angular/core';
import { StudentDto } from '../model/Student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   public text = 'wlecome to ionic';
   students: StudentDto[];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
   this.studentService.getAllStudents().subscribe(data => {
    this.students = data;
  });
  }
  onChangeText() {
    this.text = 'My text';
  }

}
