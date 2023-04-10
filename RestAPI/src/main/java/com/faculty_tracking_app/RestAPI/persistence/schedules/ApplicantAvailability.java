package com.faculty_tracking_app.RestAPI.persistence.schedules;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Data
@Table (name = "applicant_availability")
public class ApplicantAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long av_id;
    private Long u_id;
    private Long day_id;
    private String start_time;
    private String end_time;
}
