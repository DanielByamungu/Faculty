package com.faculty_tracking_app.RestAPI.resource.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.CourseSchedule;
import com.faculty_tracking_app.RestAPI.service.schedules.CourseScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class CourseScheduleResource {

    CourseScheduleService service;

    public CourseScheduleResource(CourseScheduleService service) {
        this.service = service;
    }

    @GetMapping(value = "/courseschedule")
    public List<CourseSchedule> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/courseschedule/{cs_id}")
    public CourseSchedule getById(@PathVariable Long cs_id) throws ClassNotFoundException {
        return service.getById(cs_id);
    }

    @GetMapping (value = "/courseschedule/get-course/{course_id}")
    public List<CourseSchedule> getScheduleByCourseId (@PathVariable Long course_id) {
        return service.getScheduleByCourseId(course_id);
    }

    @PostMapping(value = "/courseschedule", consumes = "application/json")
    public CourseSchedule add(@RequestBody CourseSchedule course_schedule) {
        return service.add(course_schedule);
    }

    @PutMapping(value = "/courseschedule/{cs_id}", consumes = "application/json")
    public CourseSchedule update(@PathVariable Long cs_id, @RequestBody CourseSchedule newSchedule) {
        return service.update(cs_id, newSchedule);
    }

    @DeleteMapping(value = "/courseschedule/{cs_id}")
    public void delete(Long cs_id) {
        service.delete(cs_id);
    }
}
