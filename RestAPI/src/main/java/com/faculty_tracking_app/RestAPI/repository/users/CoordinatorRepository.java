package com.faculty_tracking_app.RestAPI.repository.users;

import com.faculty_tracking_app.RestAPI.persistence.users.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoordinatorRepository extends JpaRepository<Coordinator, Long> {
    /*@Query (value = "SELECT * FROM coordinators", nativeQuery = true)
    List<Coordinator> getAll();*/

    /*@Query (value = "SELECT * FROM coordinators WHERE u_id = ?1", nativeQuery = true)
    Optional<Coordinator> findCoordinatorById (Long u_id);
*/
    @Query(value = "SELECT * FROM coordinators WHERE email=?1 ", nativeQuery = true)
    Coordinator findLogin (String email);
}
