package com.faculty_tracking_app.RestAPI.repository.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query(value = "SELECT * FROM admins WHERE email=?1", nativeQuery = true)
    Admin findLogin (String email);

   /* @Query (value = "SELECT * FROM admins;", nativeQuery = true)
    List<Admin> getAll();*/

  /*  @Query (value = "SELECT * FROM admins WHERE u_id=?1", nativeQuery = true)
    Optional<Admin> findAdminById (Long u_id);*/
}
