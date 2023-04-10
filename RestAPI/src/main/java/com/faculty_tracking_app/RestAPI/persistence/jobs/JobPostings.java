package com.faculty_tracking_app.RestAPI.persistence.jobs;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "job_postings")
public class JobPostings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long job_id;
    private Long course_id;
}
