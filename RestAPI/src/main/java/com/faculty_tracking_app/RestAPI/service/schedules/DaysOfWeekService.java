package com.faculty_tracking_app.RestAPI.service.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.DaysOfWeek;
import com.faculty_tracking_app.RestAPI.repository.schedules.DaysOfWeekRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DaysOfWeekService {
    DaysOfWeekRepository repo;

    public DaysOfWeekService(DaysOfWeekRepository repo) {
        this.repo = repo;
    }

    public List<DaysOfWeek> getAll() {
        return this.repo.findAll();
    }

    public DaysOfWeek getById(Long day_id) throws ClassNotFoundException {
        return this.repo.findById(day_id).orElseThrow(ClassNotFoundException::new);
    }

    public DaysOfWeek add(DaysOfWeek day_name) {
        return this.repo.save(day_name);
    }

    public DaysOfWeek update(Long day_id, DaysOfWeek newDay) {
        Optional<DaysOfWeek> oldDay = this.repo.findById(day_id);
        if (oldDay.isPresent()) {
            oldDay.get().setDay_of_week(newDay.getDay_of_week());
            return this.repo.save(oldDay.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long day_id) {
        this.repo.deleteById(day_id);
    }
}
