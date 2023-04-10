package com.faculty_tracking_app.RestAPI.repository.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.FacultyAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyAvailabilityRepository extends JpaRepository<FacultyAvailability, Long> {

    @Query(value = "SELECT * FROM faculty_availability WHERE av_id=?1 AND day_id=?2;", nativeQuery = true)
    FacultyAvailability getFacultyByDay(Long av_id, Long day_id);
}
