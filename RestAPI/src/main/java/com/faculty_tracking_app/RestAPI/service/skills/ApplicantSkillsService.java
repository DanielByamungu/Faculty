package com.faculty_tracking_app.RestAPI.service.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.ApplicantSkills;
import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import com.faculty_tracking_app.RestAPI.repository.skills.ApplicantSkillsRepository;
import com.faculty_tracking_app.RestAPI.repository.skills.SkillRepository;
import com.faculty_tracking_app.RestAPI.repository.users.ApplicantRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicantSkillsService {

    ApplicantSkillsRepository repo;
    ApplicantRepository aRepo;
    SkillRepository sRepo;

    public ApplicantSkillsService(ApplicantSkillsRepository repo, ApplicantRepository aRepo, SkillRepository sRepo) {
        this.repo = repo;
        this.aRepo = aRepo;
        this.sRepo = sRepo;
    }

    public List<ApplicantSkills> getAll() {
        return this.repo.findAll();
    }

    public ApplicantSkills getByIds(Long skill_id, Long u_id) {
        return this.repo.getByTwoIds(skill_id, u_id);
    }

    public List<Applicant> getAllApplicantsWithSkill(Long skill_id, Long ranking_id) throws ClassNotFoundException {
        List<Long> ids = this.repo.getAllApplicantsWithSkill(skill_id, ranking_id);
        List<Applicant> applicantWithSkill = new ArrayList<>();
        for (Long id : ids) {
            Applicant user = this.aRepo.findById(id).orElseThrow(ClassNotFoundException::new);
            applicantWithSkill.add(user);
        }
        return applicantWithSkill;
    }

    public List<ApplicantSkills> getAllSkillsForUser(Long u_id) {
        List<Long> skill_ids = this.repo.getAllSkillsForUser(u_id);
        List<ApplicantSkills> skills = new ArrayList<>();
        for (Long id : skill_ids) {
            ApplicantSkills user_skill = this.repo.getByTwoIds(id, u_id);
            skills.add(user_skill);
        }
        return skills;
    }

    public ApplicantSkills add(ApplicantSkills userSkill) {
        return this.repo.save(userSkill);
    }

    public void delete(Long u_id, Long skill_id) {
        this.repo.deleteByIds(u_id, skill_id);
    }
}
