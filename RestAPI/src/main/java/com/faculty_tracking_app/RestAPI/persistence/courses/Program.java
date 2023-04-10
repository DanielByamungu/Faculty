package com.faculty_tracking_app.RestAPI.persistence.courses;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "programs")
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pr_id;
    private String pr_name;
}
