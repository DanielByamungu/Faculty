package com.faculty_tracking_app.RestAPI.service.jobs;

import com.faculty_tracking_app.RestAPI.persistence.jobs.JobPostings;
import com.faculty_tracking_app.RestAPI.repository.jobs.JobPostingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobPostingsService {

    JobPostingsRepository repo;

    public JobPostingsService(JobPostingsRepository repo) {
        this.repo = repo;
    }

    public List<JobPostings> getAll() {
        return this.repo.findAll();
    }

    public JobPostings getById(Long job_id) throws ClassNotFoundException {
        return this.repo.findById(job_id).orElseThrow(ClassNotFoundException::new);
    }

    public JobPostings add(JobPostings posting) {
        return this.repo.save(posting);
    }

    public JobPostings update(Long job_id, JobPostings newJob) {
        Optional<JobPostings> oldJob = this.repo.findById(job_id);
        if (oldJob.isPresent()) {
            oldJob.get().setCourse_id(newJob.getCourse_id());
            return this.repo.save(oldJob.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long job_id) {
        this.repo.deleteById(job_id);
    }
}
