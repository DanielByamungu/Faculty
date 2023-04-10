package com.faculty_tracking_app.RestAPI.resource.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.service.skills.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class SkillResource {

    SkillService service;

    public SkillResource(SkillService service) {
        this.service = service;
    }

    @GetMapping(value = "/skills")
    public List<Skill> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/skills/{skill_id}")
    public Skill getById(@PathVariable Long skill_id) throws ClassNotFoundException {
        return service.getById(skill_id);
    }

    @PostMapping(value = "/skills", consumes = "application/json")
    public Skill add(@RequestBody Skill newSkill) {
        return service.add(newSkill);
    }

    @PutMapping(value = "/skills/{skill_id}", consumes = "application/json")
    public Skill update(@PathVariable Long skill_id, @RequestBody Skill updatedSkill) {
        return service.update(skill_id, updatedSkill);
    }

    @DeleteMapping(value = "/skills/{skill_id}")
    public void delete(@PathVariable Long skill_id) {
        service.delete(skill_id);
    }
}
