package com.faculty_tracking_app.RestAPI.repository.jobs;

import com.faculty_tracking_app.RestAPI.persistence.jobs.JobPostings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingsRepository extends JpaRepository<JobPostings, Long> {
}
