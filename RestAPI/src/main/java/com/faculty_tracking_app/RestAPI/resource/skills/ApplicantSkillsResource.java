package com.faculty_tracking_app.RestAPI.resource.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.ApplicantSkills;
import com.faculty_tracking_app.RestAPI.persistence.skills.Skill;
import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import com.faculty_tracking_app.RestAPI.service.skills.ApplicantSkillsService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class ApplicantSkillsResource {

    ApplicantSkillsService service;

    public ApplicantSkillsResource(ApplicantSkillsService service) {
        this.service = service;
    }

    @GetMapping(value = "/applicantskills/all")
    public List<ApplicantSkills> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/applicantskills")
    public ApplicantSkills getByIds(@RequestParam("skill_id") Long skill_id, @RequestParam ("u_id") Long u_id) {
        return service.getByIds(skill_id, u_id);
    }

    @GetMapping (value = "/applicantskills/users/{skill_id}/{ranking_id}")
    public List<Applicant> getAllApplicantsWithSkill(@PathVariable ("skill_id") Long skill_id, @PathVariable("ranking_id") Long ranking_id) throws ClassNotFoundException {
        return service.getAllApplicantsWithSkill(skill_id, ranking_id);
    }

    @GetMapping (value = "/applicantskills/skills/{u_id}")
    public List<ApplicantSkills> getAllSkillsForUser(@PathVariable ("u_id") Long u_id) {
        return service.getAllSkillsForUser(u_id);
    }

    @PostMapping(value = "/applicantskills", consumes = "application/json")
    public ApplicantSkills add(@RequestBody ApplicantSkills userSkill) {
        System.out.println(userSkill);
        return service.add(userSkill);
    }

    @Transactional
    @DeleteMapping(value = "/applicantskills/delete")
    public void delete(@RequestParam ("u_id") Long u_id, @RequestParam("skill_id") Long skill_id) {
        service.delete(u_id, skill_id);
    }
}
