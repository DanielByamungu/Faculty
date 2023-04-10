package com.faculty_tracking_app.RestAPI.persistence.documents;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "application_status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long s_id;
    private String s_name;
}
