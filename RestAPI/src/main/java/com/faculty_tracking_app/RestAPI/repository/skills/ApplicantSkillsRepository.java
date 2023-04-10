package com.faculty_tracking_app.RestAPI.repository.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.ApplicantSkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantSkillsRepository extends JpaRepository<ApplicantSkills, Long> {

    @Query(value = "SELECT * FROM applicant_skills WHERE skill_id=?1 AND u_id=?2", nativeQuery = true)
    ApplicantSkills getByTwoIds(Long skill_id, Long u_id);

    @Modifying
    @Query (value = "DELETE FROM applicant_skills WHERE u_id=?1 AND skill_id=?2", nativeQuery = true)
    void deleteByIds (Long u_id, Long skill_id);

    @Query (value = "SELECT u_id FROM applicant_skills WHERE skill_id=?1 AND ranking_id=?2", nativeQuery = true)
    List<Long> getAllApplicantsWithSkill (Long skill_id, Long ranking_id);

    @Query (value = "SELECT skill_id FROM applicant_skills WHERE u_id=?1", nativeQuery = true)
    List<Long> getAllSkillsForUser (Long u_id);
}
