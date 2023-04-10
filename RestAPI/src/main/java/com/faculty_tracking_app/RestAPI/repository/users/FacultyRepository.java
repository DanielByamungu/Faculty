package com.faculty_tracking_app.RestAPI.repository.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    @Query(value = "SELECT u_id FROM faculty WHERE email=?1", nativeQuery = true)
    Long getU_Id (String email);

    @Query(value = "SELECT * FROM faculty WHERE email=?1 ", nativeQuery = true)
    Faculty findLogin (String email);

    @Query (value = "SELECT * FROM faculty WHERE full_name=?1", nativeQuery = true)
    Faculty getByFullName (String fName);

    @Query(value = "SELECT * FROM faculty WHERE email=?1 ", nativeQuery = true)
    Faculty getByEmail (String email);
}
