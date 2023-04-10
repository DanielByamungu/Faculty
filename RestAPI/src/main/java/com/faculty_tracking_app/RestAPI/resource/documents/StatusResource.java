package com.faculty_tracking_app.RestAPI.resource.documents;

import com.faculty_tracking_app.RestAPI.persistence.documents.Status;
import com.faculty_tracking_app.RestAPI.service.documents.StatusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class StatusResource {

    StatusService service;

    public StatusResource(StatusService service) {
        this.service = service;
    }

    @GetMapping(value = "/status")
    public List<Status> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/status/{s_id}")
    public Status getById(@PathVariable Long s_id) throws ClassNotFoundException {
        return service.getById(s_id);
    }

    @PostMapping(value = "/status", consumes = "application/json")
    public Status add(@RequestBody Status appStatus) {
        return service.add(appStatus);
    }

    @PutMapping(value = "/status/{s_id}", consumes = "application/json")
    public Status update(@PathVariable Long s_id, @RequestBody Status newStatus) {
        return service.update(s_id, newStatus);
    }

    @DeleteMapping(value = "/status/{s_id}")
    public void delete(Long s_id) {
        service.delete(s_id);
    }
}
