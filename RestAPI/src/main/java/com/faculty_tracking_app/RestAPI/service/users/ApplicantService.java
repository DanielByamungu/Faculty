package com.faculty_tracking_app.RestAPI.service.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Applicant;
import com.faculty_tracking_app.RestAPI.repository.users.ApplicantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicantService {

    ApplicantRepository repo;

    public ApplicantService(ApplicantRepository repo) {
        this.repo = repo;
    }

    public Optional<Applicant> getById (Long u_id) throws ClassNotFoundException {
        return this.repo.findById(u_id);
    }

    public List<Applicant> getAll() {
        return this.repo.findAll();
    }

    public Applicant add (Applicant user){
        return this.repo.save(user);
    }

    public Applicant update (Long u_id, Applicant applicant) {
        System.out.println("FULL NAME: " + applicant.getFull_name());
        Optional<Applicant> user = this.repo.findById(u_id);
        if (user.isPresent()) {
            Applicant updateUser = user.get();
            updateUser.setEmail(applicant.getEmail());
            updateUser.setPswrd(applicant.getPswrd());
            updateUser.setType_id(applicant.getType_id());
            updateUser.setFull_name(applicant.getFull_name());
            updateUser.setHome_phone(applicant.getHome_phone());
            updateUser.setMobile_phone(applicant.getMobile_phone());
            return this.repo.save(updateUser);
        }
        throw new RuntimeException();
    }

    public void delete (Long u_id) {
        this.repo.deleteById(u_id);
    }

    public Applicant ApplicantLogin (String email) {
        return this.repo.findLogin(email);
    }
}
