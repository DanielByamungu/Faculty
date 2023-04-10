package com.faculty_tracking_app.RestAPI.repository.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.FacultySkills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FacultySkillsRepository extends JpaRepository<FacultySkills, Long> {

    @Query(value = "SELECT * FROM faculty_skills WHERE skill_id=?1 AND u_id=?2", nativeQuery = true)
    FacultySkills getByTwoIds(Long skill_id, Long u_id);

    @Transactional
    @Modifying
    @Query (value = "DELETE FROM faculty_skills WHERE u_id=?1 AND skill_id=?2", nativeQuery = true)
    void deleteById (Long u_id, Long skill_id);

    @Query (value = "SELECT u_id FROM faculty_skills WHERE skill_id=?1 AND ranking_id=?2", nativeQuery = true)
    List<Long> getAllFacultyWithSkill (Long skill_id, Long ranking_id);

    @Query (value = "SELECT skill_id FROM faculty_skills WHERE u_id=?1", nativeQuery = true)
    List<Long> getAllSkillsForUser (Long u_id);
}
