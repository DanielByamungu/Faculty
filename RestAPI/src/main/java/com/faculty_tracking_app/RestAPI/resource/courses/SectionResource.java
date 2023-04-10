package com.faculty_tracking_app.RestAPI.resource.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Section;
import com.faculty_tracking_app.RestAPI.service.courses.SectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin (origins = "*")
@RestController
public class SectionResource {

    SectionService service;

    public SectionResource(SectionService service) {
        this.service = service;
    }

    @GetMapping(value = "/sections")
    public List<Section> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/sections/{section_id}")
    public Section getById(@PathVariable Long section_id) throws ClassNotFoundException {
        return service.getById(section_id);
    }

    @PostMapping(value = "/sections", consumes = "application/json")
    public Section add(@RequestBody Section section) {
        return service.add(section);
    }

    @PutMapping(value = "/sections/{section_id}", consumes = "application/json")
    public Section update(@PathVariable Long section_id, @RequestBody Section newSection) {
        return service.update(section_id, newSection);
    }

    @DeleteMapping(value = "/sections/{section_id}")
    public void delete(@PathVariable Long section_id) {
        service.delete(section_id);
    }
}
