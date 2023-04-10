package com.faculty_tracking_app.RestAPI.persistence.jobs;

import lombok.Data;
import springfox.documentation.spring.web.json.Json;

import javax.persistence.*;
import java.io.File;
import java.sql.Blob;
import java.sql.Date;

@Entity
@Data
@Table (name = "applications")
public class Applications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long app_id;
    private Long s_id;
    private Long job_id;
    private Date date_created;
    private boolean available_term;
    private boolean vacation_planned;
    private boolean available_in_person_waterloo;
    private boolean available_in_person_guelph;
    private boolean residing_ontario;
    private String hrs_week;
    private String comments;
    private int u_id;
}
