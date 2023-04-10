package com.faculty_tracking_app.RestAPI.repository.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

    @Query(value = "SELECT * FROM applicants WHERE u_id = ?1;", nativeQuery = true)
    Applicant LoginApplicant(Long u_id);

   /* @Query(value = "SELECT * FROM applicants;", nativeQuery = true)
    List<Applicant> getAll();*/

  /*  @Query(value = "SELECT * FROM applicants WHERE u_id =?1", nativeQuery = true)
    Optional<Applicant> findApplicantById(Long u_id);*/

    @Query(value = "SELECT * FROM applicants WHERE email=?1 ", nativeQuery = true)
    Applicant findLogin(String email);
}


