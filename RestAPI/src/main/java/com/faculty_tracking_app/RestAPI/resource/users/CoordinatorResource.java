package com.faculty_tracking_app.RestAPI.resource.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Coordinator;
import com.faculty_tracking_app.RestAPI.service.users.CoordinatorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CoordinatorResource {

    CoordinatorService service;

    public CoordinatorResource(CoordinatorService service) {
        this.service = service;
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/coordinators/{u_id}")
    public Coordinator getById(@PathVariable Long u_id) throws ClassNotFoundException {
        return service.getById(u_id);
    }

    @CrossOrigin (origins = "*")
    @GetMapping (value = "/coordinators")
    public List<Coordinator> getAll() {
        return service.getAll();
    }

    @CrossOrigin (origins = "*")
    @PostMapping(value = "/coordinators", consumes = "application/json")
    public Coordinator add(@RequestBody Coordinator user) {
        return service.add(user);
    }

    @CrossOrigin (origins = "*")
    @PutMapping (value = "/coordinators/{u_id}", consumes = "application/json")
    public Coordinator update(@PathVariable Long u_id, @RequestBody Coordinator coord) {
        return service.update(u_id, coord);
    }

    @CrossOrigin (origins = "*")
    @DeleteMapping (value = "/coordinators/{u_id}")
    public void delete(@PathVariable Long u_id) {
        service.delete(u_id);
    }

    @CrossOrigin (origins = "*")
    @PostMapping (value = "/coordinators/login")
    public Coordinator Login(@RequestParam String email) {
        return service.CoordLogin(email);
    }
}
