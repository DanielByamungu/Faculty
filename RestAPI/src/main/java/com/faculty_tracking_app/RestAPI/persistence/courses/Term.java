package com.faculty_tracking_app.RestAPI.persistence.courses;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "terms")
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long term_id;
    private String term_name;
}
