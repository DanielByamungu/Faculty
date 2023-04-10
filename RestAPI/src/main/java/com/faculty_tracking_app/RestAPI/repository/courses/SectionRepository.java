package com.faculty_tracking_app.RestAPI.repository.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
    @Query(value = "SELECT section_id FROM sections WHERE section_number=?1", nativeQuery = true)
    Long getSectionID (Long section_number);
}
