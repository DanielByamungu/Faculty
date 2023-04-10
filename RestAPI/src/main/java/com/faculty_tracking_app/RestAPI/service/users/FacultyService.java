package com.faculty_tracking_app.RestAPI.service.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.repository.users.FacultyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    FacultyRepository repo;

    public FacultyService(FacultyRepository repo) {
        this.repo = repo;
    }

    public Optional<Faculty> getById (Long u_id) throws ClassNotFoundException {
        return this.repo.findById(u_id);
    }

    public List<Faculty> getAll() {
        return this.repo.findAll();
    }

    public Faculty add (Faculty user){
        return this.repo.save(user);
    }

    public Faculty update (Long u_id, Faculty faculty) {
        Optional<Faculty> user = this.repo.findById(u_id);
        if (user.isPresent()) {
            Faculty updateUser = user.get();
            updateUser.setFull_name(faculty.getFull_name());
            updateUser.setEmail(faculty.getEmail());
            updateUser.setPswrd(faculty.getPswrd());
            updateUser.setType_id(faculty.getType_id());
            updateUser.setHire_date(faculty.getHire_date());
            updateUser.setRating_avg(faculty.getRating_avg());
            updateUser.setHome_phone(faculty.getHome_phone());
            updateUser.setMobile_phone(faculty.getMobile_phone());
            return this.repo.save(updateUser);
        }
        throw new RuntimeException();
    }

    public void delete (Long u_id) {
        this.repo.deleteById(u_id);
    }

    public Faculty FacultyLogin (String email) {
        return this.repo.findLogin(email);
    }

    public Long getU_Id(String email) {
        return repo.getU_Id(email);
    }

    public Faculty getByFullName (String fName) {
        return this.repo.getByFullName(fName);
    }

    public Faculty getByEmail (String email) {
        return this.repo.getByEmail(email);
    }
}
