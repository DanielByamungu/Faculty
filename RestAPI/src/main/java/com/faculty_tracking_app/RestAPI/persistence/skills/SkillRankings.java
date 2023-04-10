package com.faculty_tracking_app.RestAPI.persistence.skills;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "skill_rankings")
public class SkillRankings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ranking_id;
    private String ranking;
}
