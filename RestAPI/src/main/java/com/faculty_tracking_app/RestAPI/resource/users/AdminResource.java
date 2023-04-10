package com.faculty_tracking_app.RestAPI.resource.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Admin;
import com.faculty_tracking_app.RestAPI.service.users.AdminService;
//import com.sun.net.httpserver.Request;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminResource {

    AdminService service;

    public AdminResource(AdminService service) {
        this.service = service;
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/admins/{u_id}")
    public Admin getById(@PathVariable Long u_id) throws ClassNotFoundException {
        return service.getById(u_id);
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/admins/all")
    public List<Admin> getAll() {
        return service.getAll();
    }

    @CrossOrigin (origins = "*")
    @PostMapping(value = "/admins", consumes = "application/json")
    public Admin add(@RequestBody Admin admin) {
        return service.add(admin);
    }

    @CrossOrigin (origins = "*")
    @PutMapping(value = "/admins/{u_id}", consumes = "application/json")
    public Admin update(@PathVariable Long u_id, @RequestBody Admin admin) {
        return service.update(u_id, admin);
    }

    @CrossOrigin (origins = "*")
    @DeleteMapping(value = "/admins/{u_id}")
    public void delete(@PathVariable Long u_id) {
        service.delete(u_id);
    }

    @CrossOrigin (origins = "*")
    @PostMapping(value = "/admins/login", consumes = "application/json", produces = "application/json")
    public Admin Login(@RequestParam ("email") String email) {
        return service.AdminLogin(email);
    }
}
