package com.faculty_tracking_app.RestAPI.service.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.repository.skills.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    SkillRepository repo;

    public SkillService(SkillRepository repo) {
        this.repo = repo;
    }

    public List<Skill> getAll(){
        return this.repo.findAll();
    }

    public Skill getById (Long skill_id) throws ClassNotFoundException {
        return this.repo.findById(skill_id).orElseThrow(ClassNotFoundException::new);
    }

    public Skill add (Skill newSkill) {
        return this.repo.save(newSkill);
    }

    public Skill update (Long skill_id, Skill updatedSkill) {
        Optional<Skill> oldSkill = this.repo.findById(skill_id);
        if (oldSkill.isPresent()) {
            oldSkill.get().setSkill_name(updatedSkill.getSkill_name());
            return this.repo.save(oldSkill.get());
        }
        throw new RuntimeException();
    }

    public void delete (Long skill_id) {
        this.repo.deleteById(skill_id);
    }
}
