package com.faculty_tracking_app.RestAPI.repository.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.SkillRankings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRankingsRepository extends JpaRepository<SkillRankings, Long> {
}
