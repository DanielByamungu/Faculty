package com.faculty_tracking_app.RestAPI.repository.ratings;

import com.faculty_tracking_app.RestAPI.persistence.ratings.FacultyRatings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRatingsRepository extends JpaRepository<FacultyRatings, Long> {
    @Query(value = "SELECT * FROM faculty_ratings WHERE u_id=?1", nativeQuery = true)
    List<FacultyRatings> getFacultyRatingsBy (Long u_id);
}
