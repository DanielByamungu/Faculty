package com.faculty_tracking_app.RestAPI.repository.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.DaysOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DaysOfWeekRepository extends JpaRepository<DaysOfWeek, Long> {
}
