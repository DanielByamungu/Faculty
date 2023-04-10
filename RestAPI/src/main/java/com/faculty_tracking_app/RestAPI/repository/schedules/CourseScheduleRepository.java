package com.faculty_tracking_app.RestAPI.repository.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.CourseSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseScheduleRepository extends JpaRepository<CourseSchedule, Long> {
    @Query(value = "SELECT * FROM course_schedule WHERE course_id=?1 ORDER BY day_id", nativeQuery = true)
    List<CourseSchedule> getScheduleByCourseId (Long course_id);
}
