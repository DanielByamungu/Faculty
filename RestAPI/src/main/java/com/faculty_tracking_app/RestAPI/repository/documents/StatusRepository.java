package com.faculty_tracking_app.RestAPI.repository.documents;

import com.faculty_tracking_app.RestAPI.persistence.documents.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
