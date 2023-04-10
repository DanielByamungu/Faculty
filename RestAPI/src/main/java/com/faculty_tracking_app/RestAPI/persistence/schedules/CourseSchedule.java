package com.faculty_tracking_app.RestAPI.persistence.schedules;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Data
@Table (name = "course_schedule")
public class CourseSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cs_id;
    private Long course_id;
    private Long day_id;
    private String start_time;
    private String end_time;
}
