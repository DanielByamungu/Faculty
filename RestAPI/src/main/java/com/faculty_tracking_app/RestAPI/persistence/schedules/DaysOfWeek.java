package com.faculty_tracking_app.RestAPI.persistence.schedules;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "days_of_week")
public class DaysOfWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long day_id;
    private String day_of_week;
}
