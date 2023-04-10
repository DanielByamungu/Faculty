package com.faculty_tracking_app.RestAPI.repository.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.CoursesTaught;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CoursesTaughtRepository extends JpaRepository<CoursesTaught, Long> {

    @Modifying
    @Query(value = "DELETE FROM courses_taught WHERE u_id=?1 AND course_id=?2", nativeQuery = true)
    void deleteByTwoIds (Long u_id, Long course_id);

    @Query(value = "SELECT * FROM courses_taught WHERE course_id=?1 AND u_id=?2", nativeQuery = true)
    CoursesTaught getByTwoIds(Long course_id, Long u_id);

    @Query (value = "SELECT u_id FROM courses_taught WHERE course_id=?1", nativeQuery = true)
    List<Long> getAllUsersForCourse (Long course_id);

    @Query (value = "SELECT * FROM courses_taught WHERE u_id=?1", nativeQuery = true)
    List<CoursesTaught> getAllCoursesForUser (Long u_id);

    @Query(value = "SELECT course_id FROM courses WHERE course_code=?1 AND section_id=?2 AND term_id=?3", nativeQuery = true)
    Long getCourseIdForCoursesTaught (String course_code, Long section_id, Long term_id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM courses_taught WHERE u_id=?1", nativeQuery = true)
    void deleteAllByU_id (Long u_id);
}
