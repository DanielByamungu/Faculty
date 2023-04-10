package com.faculty_tracking_app.RestAPI.resource.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.FacultySkills;
import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.service.skills.FacultySkillsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class FacultySkillsResource {

    FacultySkillsService service;

    public FacultySkillsResource(FacultySkillsService service) {
        this.service = service;
    }

    @GetMapping(value = "/facultyskills/all")
    public List<FacultySkills> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/facultyskills/{skill_id}/{u_id}")
    public FacultySkills getByIds(@PathVariable("skill_id") Long skill_id, @PathVariable ("u_id") Long u_id) {
        return service.getByIds(skill_id, u_id);
    }

    @GetMapping(value = "/facultyskills/faculty/{skill_id}/{ranking_id}")
    public List<Faculty> getAllFacultyWithSkill(@PathVariable ("skill_id") Long skill_id, @PathVariable("ranking_id") Long ranking_id) {
        return service.getAllFacultyWithSkill(skill_id, ranking_id);
    }

    @GetMapping (value = "/facultyskills/skills/{u_id}")
    public List<FacultySkills> getAllSkillsForUser(@PathVariable ("u_id") Long u_id) {
        return service.getAllSkillsForUser(u_id);
    }

    @PostMapping(value = "/facultyskills", consumes = "application/json")
    public FacultySkills add(@RequestBody FacultySkills userSkill) {
        return service.add(userSkill);
    }

    @CrossOrigin (origins = "*")
    @DeleteMapping(value = "/facultyskills/delete")
    public void delete(@RequestParam ("u_id") Long u_id, @RequestParam ("skill_id") Long skill_id) {
        service.delete(u_id, skill_id);
    }
}
