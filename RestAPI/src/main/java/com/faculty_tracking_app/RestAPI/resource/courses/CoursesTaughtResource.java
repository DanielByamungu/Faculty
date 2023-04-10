package com.faculty_tracking_app.RestAPI.resource.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.persistence.courses.CoursesTaught;
import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.service.courses.CoursesTaughtService;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class CoursesTaughtResource {

    CoursesTaughtService service;

    public CoursesTaughtResource(CoursesTaughtService service) {
        this.service = service;
    }

    @GetMapping(value = "/coursestaught/all")
    public List<CoursesTaught> getAllCoursesTaught() {
        return service.getAll();
    }

    @GetMapping(value = "/coursestaught/{course_id}/{u_id}")
    public CoursesTaught getByTwoIds(@PathVariable ("course_id") Long course_id, @PathVariable ("u_id") Long u_id) {
        return service.getByIds(course_id, u_id);
    }

    @GetMapping(value = "/coursestaught/users/{course_id}")
    public List<Faculty> getAllUsersTeachingCourse(@PathVariable ("course_id") Long course_id) {
        return service.getAllUsersTeachingCourse(course_id);
    }

    @GetMapping(value = "/coursestaught/courses/{u_id}")
    public List<CoursesTaught> getAllCourseForUser(@PathVariable ("u_id") Long u_id) {
        return service.getAllCourseForUser(u_id);
    }

    @PostMapping(value = "/coursestaught", consumes = "application/json")
    public CoursesTaught add(@RequestBody CoursesTaught scheduleCT) {
        System.out.println(scheduleCT);
        return service.add(scheduleCT);
    }

    @DeleteMapping(value = "/coursestaught/delete/{course_id}/{u_id}")
    public void delete(@PathVariable Long course_id, @PathVariable Long u_id) {
        service.delete(course_id, u_id);
    }

    @GetMapping(value = "/coursestaught/getid/{course_code}/{section_number}/{term_name}")
    public Long getCourseId(@PathVariable String course_code, @PathVariable Long section_number, @PathVariable String term_name) {
        return service.getCourseId(course_code, section_number, term_name);
    }

    @Transactional
    @Modifying
    @DeleteMapping(value = "/coursestaught/{u_id}")
    public void deleteAllByUserId (@PathVariable Long u_id) {
        this.service.deleteAllByUserId(u_id);
    }
}
