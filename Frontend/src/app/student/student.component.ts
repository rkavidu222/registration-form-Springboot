import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  StudentArray: any[] = [];
  name: string = "";
  address: string = "";
  mobile: number = 0;

  currentStudentId = "";

  constructor(private http: HttpClient) {
    this.getAllStudents();
  }

  register() {
    const bodyData = {
      name: this.name,
      address: this.address,
      mobile: this.mobile
    };

    this.http.post("http://localhost:8081/api/v1/student/save", bodyData, { responseType: 'text' })
      .subscribe({
        next: (resultData: any) => {
          console.log('Result data:', resultData);
          alert("Student Registered Successfully");
          this.getAllStudents();
          this.name = '';
          this.address = '';
          this.mobile = 0;
        },
        error: (error) => {
          console.error('Error details:', error);
          alert(`There was an error registering the student: ${error.message || error.statusText}`);
        }
      });
  }

  getAllStudents() {
    this.http.get<any[]>("http://localhost:8081/api/v1/student/getAll")
      .subscribe({
        next: (data) => {
          this.StudentArray = data;
        },
        error: (error) => {
          console.error('Error fetching student data:', error);
        }
      });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.mobile = data.mobile;
    this.currentStudentId = data.id;
  }

  UpdateRecords() {
    const bodyData = {
      id: this.currentStudentId,
      name: this.name,
      address: this.address,
      mobile: this.mobile
    };

    this.http.put("http://localhost:8081/api/v1/student/edit/" + this.currentStudentId, bodyData, { responseType: 'text' })
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert("Student Record Updated");
          this.getAllStudents();
          this.name = '';
          this.address = '';
          this.mobile = 0;
        },
        error: (error) => {
          console.error('Error details:', error);
          alert(`There was an error updating the student: ${error.message || error.statusText}`);
        }
      });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8081/api/v1/student/delete/" + data.id, { responseType: 'text' })
      .subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          alert("Student Deleted");
          this.StudentArray = this.StudentArray.filter(student => student.id !== data.id);
        },
        error: (error) => {
          console.error('Error details:', error);
          alert(`There was an error deleting the student: ${error.message || error.statusText}`);
        }
      });
  }

  save() {
    if (this.currentStudentId === '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
}
