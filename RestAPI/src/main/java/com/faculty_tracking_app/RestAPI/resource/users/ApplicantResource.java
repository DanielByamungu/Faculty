package com.faculty_tracking_app.RestAPI.resource.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import com.faculty_tracking_app.RestAPI.service.users.ApplicantService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping (value = "/applicants")
public class ApplicantResource {

    ApplicantService service;

    public ApplicantResource(ApplicantService service) {
        this.service = service;
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/{u_id}")
    public Optional<Applicant> getById(@PathVariable Long u_id) throws ClassNotFoundException {
        return service.getById(u_id);
    }

    @CrossOrigin (origins = "*")
    @GetMapping (value = "")
    public List<Applicant> getAll() {
        return service.getAll();
    }

    @CrossOrigin (origins = "*")
    @PostMapping(value = "", consumes = "application/json")
    public Applicant add(@RequestBody Applicant user) {
        return service.add(user);
    }

    @CrossOrigin (origins = "*")
    @PutMapping (value = "/{u_id}", consumes = "application/json")
    public Applicant update(@PathVariable Long u_id, @RequestBody Applicant applicant) {
        return service.update(u_id, applicant);
    }

    @CrossOrigin (origins = "*")
    @DeleteMapping (value = "/{u_id}")
    public void delete(@PathVariable Long u_id) {
        service.delete(u_id);
    }

    @CrossOrigin (origins = "*")
    @PostMapping (value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public Applicant Login(@RequestParam ("email") String email) {
        return service.ApplicantLogin(email);
    }
}
