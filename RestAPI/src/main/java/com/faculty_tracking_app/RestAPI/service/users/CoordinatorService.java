package com.faculty_tracking_app.RestAPI.service.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Coordinator;
import com.faculty_tracking_app.RestAPI.repository.users.CoordinatorRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CoordinatorService {

    CoordinatorRepository repo;

    public CoordinatorService(CoordinatorRepository repo) {
        this.repo = repo;
    }

    public Coordinator getById(Long u_id) throws ClassNotFoundException {
        return this.repo.findById(u_id).orElseThrow(ClassNotFoundException::new);
    }

    public List<Coordinator> getAll() {
        return this.repo.findAll();
    }

    public Coordinator add(Coordinator user) {
        return this.repo.save(user);
    }

    public Coordinator update(Long u_id, Coordinator coord) {
        Optional<Coordinator> user = this.repo.findById(u_id);
        if (user.isPresent()) {
            Coordinator updateUser = user.get();
            updateUser.setEmail(coord.getEmail());
            updateUser.setPswrd(coord.getPswrd());
            updateUser.setType_id(coord.getType_id());
            updateUser.setPr_id(coord.getPr_id());
            updateUser.setHire_date(coord.getHire_date());
            return this.repo.save(updateUser);
        }
        throw new RuntimeException();
    }

    public void delete(Long u_id) {
        this.repo.deleteById(u_id);
    }

    public Coordinator CoordLogin(String email) {
        return this.repo.findLogin(email);

    }
}
