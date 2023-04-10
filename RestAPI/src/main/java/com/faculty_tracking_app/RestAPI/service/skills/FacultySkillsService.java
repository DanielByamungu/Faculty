package com.faculty_tracking_app.RestAPI.service.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.FacultySkills;
import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.repository.skills.FacultySkillsRepository;
import com.faculty_tracking_app.RestAPI.repository.skills.SkillRepository;
import com.faculty_tracking_app.RestAPI.repository.users.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FacultySkillsService {

    FacultySkillsRepository repo;
    FacultyRepository fRepo;

    SkillRepository sRepo;

    public FacultySkillsService(FacultySkillsRepository repo, FacultyRepository fRepo, SkillRepository sRepo) {
        this.repo = repo;
        this.fRepo = fRepo;
        this.sRepo = sRepo;
    }

    public List<FacultySkills> getAll() {
        return this.repo.findAll();
    }

    public FacultySkills getByIds (Long skill_id, Long u_id) {
        return this.repo.getByTwoIds(skill_id, u_id);
    }

    public List<Faculty> getAllFacultyWithSkill (Long skill_id, Long ranking_id) {
        List<Long> ids = this.repo.getAllFacultyWithSkill(skill_id, ranking_id);
        List<Faculty> facultyWithSkill = new ArrayList<>();
        for (Long id : ids) {
            Optional<Faculty> user = this.fRepo.findById(id);
            user.ifPresent(facultyWithSkill::add);
        }
        return facultyWithSkill;
    }

    public List<FacultySkills> getAllSkillsForUser (Long u_id) {
        List<Long> skill_ids = this.repo.getAllSkillsForUser(u_id);
        List <FacultySkills> skills = new ArrayList<>();
        for (Long id : skill_ids) {
            FacultySkills user_skill = this.repo.getByTwoIds(id, u_id);
            skills.add(user_skill);
        }
        return skills;
    }

    public FacultySkills add (FacultySkills userSkill) {
        return this.repo.save(userSkill);
    }

    public void delete(Long u_id, Long skill_id) {
        this.repo.deleteById(u_id, skill_id);
    }
}
