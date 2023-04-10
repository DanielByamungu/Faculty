package com.faculty_tracking_app.RestAPI.persistence.courses;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long course_id;
    private String course_code;
    private String course_name;
    private Long section_id;
    private Long term_id;
}
