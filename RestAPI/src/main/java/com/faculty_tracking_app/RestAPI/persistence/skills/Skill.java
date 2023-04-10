package com.faculty_tracking_app.RestAPI.persistence.skills;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table (name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skill_id;
    private String skill_name;
}
