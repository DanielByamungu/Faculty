package com.faculty_tracking_app.RestAPI.service.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.CourseSchedule;
import com.faculty_tracking_app.RestAPI.repository.schedules.CourseScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseScheduleService {

    CourseScheduleRepository repo;

    public CourseScheduleService(CourseScheduleRepository repo) {
        this.repo = repo;
    }

    public List<CourseSchedule> getAll() {
        return this.repo.findAll();
    }

    public CourseSchedule getById(Long cs_id) throws ClassNotFoundException {
        return this.repo.findById(cs_id).orElseThrow(ClassNotFoundException::new);
    }

    public CourseSchedule add(CourseSchedule course_schedule) {
        return this.repo.save(course_schedule);
    }

    public CourseSchedule update(Long cs_id, CourseSchedule newSchedule) {
        Optional<CourseSchedule> oldSchedule = this.repo.findById(cs_id);
        if (oldSchedule.isPresent()) {
            oldSchedule.get().setCourse_id(newSchedule.getCourse_id());
            oldSchedule.get().setDay_id(newSchedule.getDay_id());
            oldSchedule.get().setStart_time(newSchedule.getStart_time());
            oldSchedule.get().setEnd_time(newSchedule.getEnd_time());
            return this.repo.save(oldSchedule.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long cs_id) {
        this.repo.deleteById(cs_id);
    }

    public List<CourseSchedule> getScheduleByCourseId (Long course_id) {
        return this.repo.getScheduleByCourseId(course_id);
    }
}
