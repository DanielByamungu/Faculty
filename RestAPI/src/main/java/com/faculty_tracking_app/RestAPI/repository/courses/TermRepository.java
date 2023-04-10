package com.faculty_tracking_app.RestAPI.repository.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {
    @Query(value = "SELECT term_id FROM terms WHERE term_name=?1", nativeQuery = true)
    Long getTermID (String term_name);
}
