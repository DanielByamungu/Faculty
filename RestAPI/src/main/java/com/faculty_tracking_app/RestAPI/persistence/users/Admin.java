package com.faculty_tracking_app.RestAPI.persistence.users;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_id;
    private String email;
    private String pswrd;
    private Long type_id;
}
