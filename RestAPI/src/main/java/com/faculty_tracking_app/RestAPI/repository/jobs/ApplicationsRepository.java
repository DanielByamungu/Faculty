package com.faculty_tracking_app.RestAPI.repository.jobs;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.persistence.jobs.Applications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ApplicationsRepository extends JpaRepository<Applications, Long> {

    @Query(value = "SELECT app_id FROM applications WHERE u_id=?1", nativeQuery = true)
    Long getAppId (Long u_id);

    @Query (value = "SELECT * FROM applications WHERE app_id=?1", nativeQuery = true)
    Applications userApplication (Long app_id);

    @Query(value = "SELECT * FROM applications WHERE job_id=?1", nativeQuery = true)
    List<Applications> getAppByJobId (Long job_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM applications WHERE u_id=?1", nativeQuery = true)
    void deleteByUserId (Long u_id);
}
