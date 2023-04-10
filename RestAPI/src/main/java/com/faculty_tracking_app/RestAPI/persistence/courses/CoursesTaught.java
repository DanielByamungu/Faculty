package com.faculty_tracking_app.RestAPI.persistence.courses;

import com.faculty_tracking_app.RestAPI.compositeKeys.CompositeKey;
import com.faculty_tracking_app.RestAPI.compositeKeys.CoursesTaughtCompositeKey;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "courses_taught")
@IdClass(CoursesTaughtCompositeKey.class)
public class CoursesTaught {

    @Id
    @Column (name = "course_id")
    private Long course_id;
    @Id
    @Column (name = "u_id")
    private Long u_id;
}
