package com.faculty_tracking_app.RestAPI.resource.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Program;
import com.faculty_tracking_app.RestAPI.service.courses.ProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class ProgramResource {

    ProgramService service;

    public ProgramResource(ProgramService service) {
        this.service = service;
    }

    @GetMapping(value = "/programs")
    public List<Program> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/programs/{pr_id}")
    public Program getById(@PathVariable Long pr_id) throws ClassNotFoundException {
        return service.getById(pr_id);
    }

    @PostMapping(value = "/programs", consumes = "application/json")
    public Program add(@RequestBody Program program) {
        return service.add(program);
    }

    @PutMapping(value = "/programs/{pr_id}", consumes = "application/json")
    public Program update(@PathVariable Long pr_id, @RequestBody Program newProgram) {
        return service.update(pr_id, newProgram);
    }

    @DeleteMapping(value = "/programs/{pr_id}")
    public void delete(@PathVariable Long pr_id) {
        service.delete(pr_id);
    }
}
