package com.faculty_tracking_app.RestAPI.resource.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.FacultyAvailability;
import com.faculty_tracking_app.RestAPI.service.schedules.FacultyAvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class FacultyAvailabilityResource {

    FacultyAvailabilityService service;

    public FacultyAvailabilityResource(FacultyAvailabilityService service) {
        this.service = service;
    }

    public List<FacultyAvailability> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "facultyavailability/user_day")
    public FacultyAvailability getById(@RequestParam("av_id") Long av_id, @RequestParam ("day_id") Long day_id) throws ClassNotFoundException {
        return service.getById(av_id, day_id);
    }

    @PostMapping(value = "/facultyavailability", consumes = "application/json")
    public FacultyAvailability add(@RequestBody FacultyAvailability facultyAvailability) {
        return service.add(facultyAvailability);
    }

    @PutMapping(value = "/facultyavailability/{av_id}", consumes = "application/json")
    public FacultyAvailability update(@PathVariable Long av_id, @RequestBody FacultyAvailability newAvailability) {
        return service.update(av_id, newAvailability);
    }

    @DeleteMapping(value = "/facultyavailability/{av_id}")
    public void delete(@PathVariable Long av_id) {
        service.delete(av_id);
    }
}