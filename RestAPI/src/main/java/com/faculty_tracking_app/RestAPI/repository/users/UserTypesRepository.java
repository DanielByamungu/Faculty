package com.faculty_tracking_app.RestAPI.repository.users;

import com.faculty_tracking_app.RestAPI.persistence.users.UserTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTypesRepository extends JpaRepository<UserTypes, Long> {
}
