package com.faculty_tracking_app.RestAPI.persistence.skills;


import com.faculty_tracking_app.RestAPI.compositeKeys.CompositeKey;
import com.faculty_tracking_app.RestAPI.compositeKeys.SkillsCompositeKey;
import lombok.Data;

import javax.persistence.*;

@Entity
@IdClass(SkillsCompositeKey.class)
@Data
@Table(name = "applicant_skills")
public class ApplicantSkills {

    @Id
    @Column (name = "skill_id")
    private Long skill_id;
    @Id
    @Column (name = "u_id")
    private Long u_id;
    @Column (name = "ranking_id")
    private Long ranking_id;
}
