package com.faculty_tracking_app.RestAPI.persistence.users;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "applicants")
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_id;
    private String email;
    private String pswrd;
    private Long type_id;
    private String full_name;
    private String home_phone;
    private String mobile_phone;
}
