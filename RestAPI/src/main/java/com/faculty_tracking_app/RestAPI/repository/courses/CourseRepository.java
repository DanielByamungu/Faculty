package com.faculty_tracking_app.RestAPI.repository.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query(value = "SELECT * FROM courses WHERE course_name=?1 ORDER BY section_id", nativeQuery = true)
    List<Course> findCourseByName(String course_name);

    @Query(value = "SELECT * FROM courses WHERE course_code=?1 ORDER BY section_id", nativeQuery = true)
    List<Course> findCourseByCode(String course_code);
}
