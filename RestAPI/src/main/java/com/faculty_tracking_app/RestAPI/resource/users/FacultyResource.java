package com.faculty_tracking_app.RestAPI.resource.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.service.users.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin (origins = "*")
@RestController
public class FacultyResource {

    FacultyService service;

    public FacultyResource(FacultyService service) {
        this.service = service;
    }

    @GetMapping(value = "/faculty/{u_id}")
    public Optional<Faculty> getById(@PathVariable Long u_id) throws ClassNotFoundException {
        return service.getById(u_id);
    }

    @GetMapping(value = "/faculty")
    public List<Faculty> getAll() {
        return service.getAll();
    }

    @PostMapping(value = "/faculty", consumes = "application/json")
    public Faculty add(@RequestBody Faculty user) {
        return service.add(user);
    }

    @PutMapping(value = "/faculty/{u_id}", consumes = "application/json")
    public Faculty update(@PathVariable Long u_id, @RequestBody Faculty faculty) {
        return service.update(u_id, faculty);
    }

    @DeleteMapping(value = "/faculty/{u_id}")
    public void delete(@PathVariable Long u_id) {
        service.delete(u_id);
    }

    @CrossOrigin (origins = "*")
    @PostMapping(value = "/faculty/login", consumes = "application/json", produces = "application/json")
    public Faculty Login(@RequestParam ("email") String email) {
        return service.FacultyLogin(email);
    }

    @GetMapping(value = "/faculty/email/{email}")
    public Long getU_Id(@PathVariable String email) {
        return service.getU_Id(email);
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/faculty/fullname/{fName}")
    public Faculty getByFullName (@PathVariable String fName) {
        return this.service.getByFullName(fName);
    }

    @CrossOrigin (origins = "*")
    @GetMapping(value = "/faculty/byemail/{email}")
    public Faculty getByEmail (@PathVariable String email) {
        return this.service.getByEmail(email);
    }
}
