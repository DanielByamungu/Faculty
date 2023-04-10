package com.faculty_tracking_app.RestAPI.resource.schedules;

import com.faculty_tracking_app.RestAPI.persistence.schedules.ApplicantAvailability;
import com.faculty_tracking_app.RestAPI.service.schedules.ApplicantAvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class ApplicantAvailabilityResource {

    ApplicantAvailabilityService service;

    public ApplicantAvailabilityResource(ApplicantAvailabilityService service) {
        this.service = service;
    }

    @GetMapping(value = "/applicantavailability")
    public List<ApplicantAvailability> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/applicantavailablility/{av_id}")
    public ApplicantAvailability getById(@PathVariable Long av_id) throws ClassNotFoundException {
        return service.getById(av_id);
    }

    @PostMapping(value = "/applicantavailability", consumes = "application/json")
    public ApplicantAvailability add(@RequestBody ApplicantAvailability applicantAvailability) {
        return service.add(applicantAvailability);
    }

    @PutMapping(value = "/applicantavailability/{av_id}", consumes = "application/json")
    public ApplicantAvailability update(@PathVariable Long av_id, @RequestBody ApplicantAvailability applicantAvailability) {
        return service.update(av_id, applicantAvailability);
    }

    @DeleteMapping(value = "/applicantavailability/{av_id}")
    public void delete(@PathVariable Long av_id) {
        service.delete(av_id);
    }

    @GetMapping(value = "/applicantavailability/getByUser/{u_id}")
    public List<ApplicantAvailability> getApplicantAvailability(@PathVariable Long u_id) {
        return service.getApplicantAvailability(u_id);
    }

    @DeleteMapping(value = "/applicantavailability/delete/{u_id}")
    public void deleteByUserId(@PathVariable Long u_id) {
        this.service.deleteByUserId(u_id);
    }
}
