package com.faculty_tracking_app.RestAPI.resource.jobs;

import com.faculty_tracking_app.RestAPI.persistence.jobs.Applications;
import com.faculty_tracking_app.RestAPI.service.jobs.ApplicationsService;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RequestMapping(value = "/applications")
@RestController
public class ApplicationsResource {

    ApplicationsService service;

    public ApplicationsResource(ApplicationsService service) {
        this.service = service;
    }

    @GetMapping(value = "/")
    public List<Applications> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/{app_id}")
    public Applications getById(@PathVariable Long app_id) throws ClassNotFoundException {
        System.out.println("\n\nHERE!!!!!!!!!!");
        System.out.println("\n\nAPP ID: " + app_id);
        return service.getById(app_id);
    }

    @PostMapping(value = "", consumes = "application/json")
    public Applications add(@RequestBody Applications applications) {
        System.out.println("Request Body: " + applications.toString());
        return service.add(applications);
    }

    @PutMapping(value = "/{app_id}", consumes = "application/json")
    public Applications update(@PathVariable Long app_id, @RequestBody Applications newApplications) {
        return service.update(app_id, newApplications);
    }

    @DeleteMapping(value = "/{app_id}")
    public void delete(@PathVariable Long app_id) {
        service.delete(app_id);
    }

    @GetMapping(value = "/user/{u_id}")
    public Applications getApplicationForUser(@PathVariable Long u_id) {
        return service.getApplicationForUser(u_id);
    }

    @GetMapping(value = "/job-id/{job_id}")
    public List<Applications> getAppByJobId (@PathVariable Long job_id) {
        return service.getAppByJobId(job_id);
    }

    @Modifying
    @Transactional
    @DeleteMapping(value = "/deleteBy/{u_id}")
    public void deleteByUserId (@PathVariable Long u_id) {
        this.service.deleteByUserId(u_id);
    }
}
