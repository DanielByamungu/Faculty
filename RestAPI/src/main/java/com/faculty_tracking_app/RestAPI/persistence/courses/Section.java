package com.faculty_tracking_app.RestAPI.persistence.courses;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long section_id;
    private Long section_number;
}
