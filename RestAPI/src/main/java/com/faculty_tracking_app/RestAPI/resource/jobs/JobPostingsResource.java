package com.faculty_tracking_app.RestAPI.resource.jobs;

import com.faculty_tracking_app.RestAPI.persistence.jobs.JobPostings;
import com.faculty_tracking_app.RestAPI.service.jobs.JobPostingsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class JobPostingsResource {

    JobPostingsService service;

    public JobPostingsResource(JobPostingsService service) {
        this.service = service;
    }

    @GetMapping(value = "/jobpostings")
    public List<JobPostings> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/jobpostings/{job_id}")
    public JobPostings getById(@PathVariable Long job_id) throws ClassNotFoundException {
        return service.getById(job_id);
    }

    @PostMapping(value = "/jobpostings", consumes = "application/json")
    public JobPostings add(@RequestBody JobPostings posting) {
        return service.add(posting);
    }

    @PutMapping(value = "/jobpostings/{job_id}", consumes = "application/json")
    public JobPostings update(@PathVariable Long job_id, @RequestBody JobPostings newJob) {
        return service.update(job_id, newJob);
    }

    @DeleteMapping(value = "/jobpostings/{job_id}")
    public void delete(@PathVariable Long job_id) {
        service.delete(job_id);
    }
}
