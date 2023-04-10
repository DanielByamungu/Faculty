package com.faculty_tracking_app.RestAPI.repository.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
}
