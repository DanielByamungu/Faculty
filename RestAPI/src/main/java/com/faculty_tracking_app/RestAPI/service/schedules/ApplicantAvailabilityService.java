package com.faculty_tracking_app.RestAPI.service.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.ApplicantAvailability;
import com.faculty_tracking_app.RestAPI.repository.schedules.ApplicantAvailabilityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicantAvailabilityService {

    ApplicantAvailabilityRepository repo;

    public ApplicantAvailabilityService(ApplicantAvailabilityRepository repo) {
        this.repo = repo;
    }

    public List<ApplicantAvailability> getAll() {
        return this.repo.findAll();
    }

    public ApplicantAvailability getById(Long av_id) throws ClassNotFoundException {
        return this.repo.findById(av_id).orElseThrow(ClassNotFoundException::new);
    }

    public ApplicantAvailability add(ApplicantAvailability applicantAvailability) {
        return this.repo.save(applicantAvailability);
    }

    public ApplicantAvailability update(Long av_id, ApplicantAvailability applicantAvailability) {
        Optional<ApplicantAvailability> old = this.repo.findById(av_id);
        if (old.isPresent()) {
            old.get().setU_id(applicantAvailability.getU_id());
            old.get().setDay_id(applicantAvailability.getDay_id());
            old.get().setStart_time(applicantAvailability.getStart_time());
            old.get().setEnd_time(applicantAvailability.getEnd_time());
            return this.repo.save(old.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long av_id) {
        this.repo.deleteById(av_id);
    }

    public List<ApplicantAvailability> getApplicantAvailability (Long u_id) {
        return this.repo.getApplicantAvailability(u_id);
    }

    @Transactional
    public void deleteByUserId (Long u_id) {
        this.repo.deleteByUserId(u_id);
    }
}
