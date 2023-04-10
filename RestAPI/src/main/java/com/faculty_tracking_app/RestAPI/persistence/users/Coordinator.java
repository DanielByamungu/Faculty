package com.faculty_tracking_app.RestAPI.persistence.users;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@Table (name = "coordinators")
public class Coordinator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_id;
    private String email;
    private String pswrd;
    private Long type_id;
    private Long pr_id;
    private Date hire_date;
    private String full_name;
}
