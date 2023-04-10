package com.faculty_tracking_app.RestAPI.persistence.users;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@Table (name = "faculty")
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_id;
    private String email;
    private String pswrd;
    private Long type_id;
    private Date hire_date;
    private String full_name;
    private double rating_avg;
    private String home_phone;
    private String mobile_phone;
}
