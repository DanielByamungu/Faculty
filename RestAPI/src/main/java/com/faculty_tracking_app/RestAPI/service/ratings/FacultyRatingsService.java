package com.faculty_tracking_app.RestAPI.service.ratings;

import com.faculty_tracking_app.RestAPI.persistence.ratings.FacultyRatings;
import com.faculty_tracking_app.RestAPI.repository.ratings.FacultyRatingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyRatingsService {
    FacultyRatingsRepository repo;

    public FacultyRatingsService(FacultyRatingsRepository repo) {
        this.repo = repo;
    }

    public Optional<FacultyRatings> getById (Long rating_id) throws ClassNotFoundException {
        return this.repo.findById(rating_id);
    }

    public List<FacultyRatings> getAll() {
        return this.repo.findAll();
    }

    public FacultyRatings add (FacultyRatings rating){
        return this.repo.save(rating);
    }

    public FacultyRatings update (Long rating_id, FacultyRatings rating) {
        Optional<FacultyRatings> currentRating = this.repo.findById(rating_id);
        if (currentRating.isPresent()) {
            FacultyRatings updateRating = currentRating.get();
            updateRating.setU_id(rating.getU_id());
            updateRating.setRating_value(rating.getRating_value());
            return this.repo.save(updateRating);
        }
        throw new RuntimeException();
    }

    public void delete (Long rating_id) {
        this.repo.deleteById(rating_id);
    }

    public List<FacultyRatings> getRatingsByFaculty (Long u_id){
        return this.repo.getFacultyRatingsBy(u_id);
    }
}
