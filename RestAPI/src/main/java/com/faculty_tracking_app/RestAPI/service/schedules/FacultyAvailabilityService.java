package com.faculty_tracking_app.RestAPI.service.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.FacultyAvailability;
import com.faculty_tracking_app.RestAPI.repository.schedules.FacultyAvailabilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyAvailabilityService {

    FacultyAvailabilityRepository repo;

    public FacultyAvailabilityService(FacultyAvailabilityRepository repo) {
        this.repo = repo;
    }

    public List<FacultyAvailability> getAll() {
        return this.repo.findAll();
    }

    public FacultyAvailability getById(Long av_id, Long day_id) throws ClassNotFoundException {
        return this.repo.getFacultyByDay(av_id, day_id);
    }

    public FacultyAvailability add(FacultyAvailability facultyAvailability) {
        return this.repo.save(facultyAvailability);
    }

    public FacultyAvailability update(Long av_id, FacultyAvailability newAvailability) {
        Optional<FacultyAvailability> oldAvailability = this.repo.findById(av_id);
        if (oldAvailability.isPresent()) {
            oldAvailability.get().setU_id(newAvailability.getU_id());
            oldAvailability.get().setDay_id(newAvailability.getDay_id());
            oldAvailability.get().setStart_time(newAvailability.getStart_time());
            oldAvailability.get().setEnd_time(newAvailability.getEnd_time());
            return this.repo.save(oldAvailability.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long av_id) {
        this.repo.deleteById(av_id);
    }
}
