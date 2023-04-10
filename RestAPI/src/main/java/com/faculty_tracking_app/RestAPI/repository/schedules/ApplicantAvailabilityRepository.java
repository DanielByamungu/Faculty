package com.faculty_tracking_app.RestAPI.repository.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.ApplicantAvailability;
import com.faculty_tracking_app.RestAPI.persistence.schedules.FacultyAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ApplicantAvailabilityRepository extends JpaRepository<ApplicantAvailability, Long> {

    @Query(value = "SELECT * FROM applicant_availability WHERE av_id=?1 AND day_id=?2", nativeQuery = true)
    ApplicantAvailability getFacultyByDay(Long av_id, Long day_id);

    @Query(value = "SELECT * FROM applicant_availability WHERE u_id=?1", nativeQuery = true)
    List<ApplicantAvailability> getApplicantAvailability(Long u_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM applicant_availability WHERE u_id=?1", nativeQuery = true)
    void deleteByUserId(Long u_id);
}

