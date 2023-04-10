package com.faculty_tracking_app.RestAPI.resource.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.DaysOfWeek;
import com.faculty_tracking_app.RestAPI.service.schedules.DaysOfWeekService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class DaysOfWeekResource {

    DaysOfWeekService service;

    public DaysOfWeekResource(DaysOfWeekService service) {
        this.service = service;
    }

    @GetMapping(value = "/daysofweek")
    public List<DaysOfWeek> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/daysofweek/{day_id}")
    public DaysOfWeek getById(@PathVariable Long day_id) throws ClassNotFoundException {
        return service.getById(day_id);
    }

    @PostMapping(value = "/daysofweek", consumes = "application/json")
    public DaysOfWeek add(@RequestBody DaysOfWeek day_name) {
        return service.add(day_name);
    }

    @PutMapping(value = "/daysofweek/{day_id}", consumes = "application/json")
    public DaysOfWeek update(@PathVariable Long day_id, @RequestBody DaysOfWeek newDay) {
        return service.update(day_id, newDay);
    }

    @DeleteMapping(value = "/daysofweek/{day_id}")
    public void delete(@PathVariable Long day_id) {
        service.delete(day_id);
    }
}