package com.faculty_tracking_app.RestAPI.service.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.repository.courses.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<Course> getAll() {
        return this.repo.findAll();
    }

    public List<Course> findByName(String course_name) {
        return this.repo.findCourseByName(course_name);
    }

    public List<Course> findByCode(String course_code) {
        return this.repo.findCourseByCode(course_code);
    }

    public Course getById(Long course_id) throws ClassNotFoundException {
        return this.repo.findById(course_id).orElseThrow(ClassNotFoundException::new);
    }

    public Course add(Course course) {
        return this.repo.save(course);
    }

    public Course update(Long course_id, Course newCourse) {
        Optional<Course> oldCourse = this.repo.findById(course_id);
        if (oldCourse.isPresent()) {
            oldCourse.get().setCourse_code(newCourse.getCourse_code());
            oldCourse.get().setTerm_id(newCourse.getTerm_id());
            oldCourse.get().setCourse_name(newCourse.getCourse_name());
            oldCourse.get().setSection_id(newCourse.getSection_id());
            return this.repo.save(oldCourse.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long course_id) {
        this.repo.deleteById(course_id);
    }
}
