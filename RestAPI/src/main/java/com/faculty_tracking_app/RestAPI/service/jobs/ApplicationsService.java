package com.faculty_tracking_app.RestAPI.service.jobs;

import com.faculty_tracking_app.RestAPI.persistence.jobs.Applications;
import com.faculty_tracking_app.RestAPI.repository.jobs.ApplicationsRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationsService {

    ApplicationsRepository repo;

    public ApplicationsService(ApplicationsRepository repo) {
        this.repo = repo;
    }

    public List<Applications> getAll() {
        return this.repo.findAll();
    }

    public Applications getById(Long app_id) throws ClassNotFoundException {
        return this.repo.findById(app_id).orElseThrow(ClassNotFoundException::new);
    }

    public Applications add(Applications applications) {
        return this.repo.save(applications);
    }

    public Applications update(Long app_id, Applications newApplications) {
        Optional<Applications> oldApplication = this.repo.findById(app_id);
        if (oldApplication.isPresent()) {
            oldApplication.get().setS_id(newApplications.getS_id());
            oldApplication.get().setJob_id(newApplications.getJob_id());
            return this.repo.save(oldApplication.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long app_id) {
        this.repo.deleteById(app_id);
    }

    public Applications getApplicationForUser (Long u_id) {
        Long app_id = this.repo.getAppId(u_id);
        return this.repo.userApplication(app_id);
    }

    public List<Applications> getAppByJobId(Long job_id) {
        return this.repo.getAppByJobId(job_id);
    }

    @Modifying
    @Transactional
    public void deleteByUserId (Long u_id) {
        this.repo.deleteByUserId(u_id);
    }
}
