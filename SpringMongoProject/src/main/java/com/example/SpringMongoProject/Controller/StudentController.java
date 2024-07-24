package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping(value="/save")
    private String saveStudent(@RequestBody Student student){


        studentService.saveorUpdate(student);
        return student.getId();
    }

    @GetMapping(value="/getAll")
    private Iterable <Student>getStudents(){

        return studentService.listAll();
    }

    @PutMapping(value="/edit/{id}")
    private Student update(@RequestBody Student student,@PathVariable(name = "id")String id) {

        student.setId(id);
        studentService.saveorUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteStudent(@PathVariable ("id") String id) {


        studentService.deleteStudent(id);

    }

    @RequestMapping ("/search/{id}")
    private  Student getStudent(@PathVariable(name ="id") String studentId){
        return studentService.getStudentById(studentId);
    }

    
}
