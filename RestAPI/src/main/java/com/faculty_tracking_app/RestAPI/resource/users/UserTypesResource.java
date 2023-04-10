package com.faculty_tracking_app.RestAPI.resource.users;

import com.faculty_tracking_app.RestAPI.persistence.users.UserTypes;
import com.faculty_tracking_app.RestAPI.service.users.UserTypesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class UserTypesResource {

    UserTypesService service;

    public UserTypesResource(UserTypesService service) {
        this.service = service;
    }

    @GetMapping(value = "/usertypes/{type_id}")
    public UserTypes getById(@PathVariable Long type_id) throws ClassNotFoundException {
        return service.getById(type_id);
    }

    @GetMapping (value = "/usertypes")
    public List<UserTypes> getAll() {
        return service.getAll();
    }

    @PostMapping(value = "/usertypes", consumes = "application/json")
    public UserTypes add(@RequestBody UserTypes type) {
        return service.add(type);
    }

    @PutMapping (value = "/usertypes/{type_id}", consumes = "application/json")
    public UserTypes update(@PathVariable Long type_id, @RequestBody UserTypes updatedType) {
        return service.update(type_id, updatedType);
    }

    @DeleteMapping (value = "/usertypes/{type_id}")
    public void delete(@PathVariable Long type_id) {
        service.delete(type_id);
    }
}
