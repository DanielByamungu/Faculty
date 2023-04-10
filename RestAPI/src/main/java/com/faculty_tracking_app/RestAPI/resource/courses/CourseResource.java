package com.faculty_tracking_app.RestAPI.resource.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.service.courses.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin (origins = "*")
@RestController
public class CourseResource {

    CourseService service;

    public CourseResource (CourseService service) {
        this.service = service;
    }

    @GetMapping(value = "/courses")
    public List<Course> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/courses/{course_id}")
    public Course getById(@PathVariable Long course_id) throws ClassNotFoundException {
        return service.getById(course_id);
    }

    @GetMapping(value = "/courses/find-name/{course_name}")
    public List<Course> getByName (@PathVariable String course_name) throws ClassNotFoundException {
        return service.findByName(course_name);
    }

    @GetMapping(value = "/courses/find-code/{course_code}")
    public List<Course> getByCode (@PathVariable String course_code) throws ClassNotFoundException {
        return service.findByCode(course_code);
    }

    @PostMapping(value = "/courses", consumes = "application/json")
    public Course add(@RequestBody Course course) {
        System.out.println("Request Body: " + course.toString());
        return service.add(course);
    }

    @PutMapping(value = "/courses/{course_id}", consumes = "application/json")
    public Course update(@PathVariable Long course_id, @RequestBody Course newCourse) {
        return service.update(course_id, newCourse);
    }

    @DeleteMapping(value = "/courses/{course_id}")
    public void delete(@PathVariable Long course_id) {
        service.delete(course_id);
    }
}
