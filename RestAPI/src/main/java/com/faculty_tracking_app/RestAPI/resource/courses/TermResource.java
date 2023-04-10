package com.faculty_tracking_app.RestAPI.resource.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Term;
import com.faculty_tracking_app.RestAPI.service.courses.TermService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class TermResource {

    TermService service;

    public TermResource(TermService service) {
        this.service = service;
    }

    @GetMapping(value = "/terms")
    public List<Term> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/terms/{term_id}")
    public Term getById(@PathVariable Long term_id) throws ClassNotFoundException {
        return service.getById(term_id);
    }

    @PostMapping(value = "/terms", consumes = "application/json")
    public Term add(@RequestBody Term term) {
        return service.add(term);
    }

    @PutMapping(value = "/terms/{term_id}", consumes = "application/json")
    public Term update(@PathVariable Long term_id, @RequestBody Term newTerm) {
        return service.update(term_id, newTerm);
    }

    @DeleteMapping(value = "/terms/{term_id}")
    public void delete(@PathVariable Long term_id) {
        service.delete(term_id);
    }
}
