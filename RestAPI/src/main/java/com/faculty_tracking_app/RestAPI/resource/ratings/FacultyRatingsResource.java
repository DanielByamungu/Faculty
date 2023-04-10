package com.faculty_tracking_app.RestAPI.resource.ratings;

import com.faculty_tracking_app.RestAPI.persistence.ratings.FacultyRatings;
import com.faculty_tracking_app.RestAPI.service.ratings.FacultyRatingsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class FacultyRatingsResource {
    FacultyRatingsService service;

    public FacultyRatingsResource(FacultyRatingsService service) {
        this.service = service;
    }

    @GetMapping(value = "/ratings/{rating_id}")
    public Optional<FacultyRatings> getById(@PathVariable Long rating_id) throws ClassNotFoundException {
        return service.getById(rating_id);
    }

    @GetMapping(value = "/ratings")
    public List<FacultyRatings> getAll() {
        return service.getAll();
    }

    @PostMapping(value = "/ratings", consumes = "application/json")
    public FacultyRatings add(@RequestBody FacultyRatings rating) {
        return service.add(rating);
    }

    @PutMapping(value = "/ratings/{rating_id}", consumes = "application/json")
    public FacultyRatings update(@PathVariable Long rating_id, @RequestBody FacultyRatings rating) {
        return service.update(rating_id, rating);
    }

    @DeleteMapping(value = "/ratings/{rating_id}")
    public void delete(@PathVariable Long rating_id) {
        service.delete(rating_id);
    }

    @GetMapping(value = "/ratings/faculty/{u_id}")
    public List<FacultyRatings> getRatingsByFaculty(@PathVariable Long u_id) {
        return service.getRatingsByFaculty(u_id);
    }
}
