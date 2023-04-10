package com.faculty_tracking_app.RestAPI.service.users;

import com.faculty_tracking_app.RestAPI.persistence.users.Admin;
import com.faculty_tracking_app.RestAPI.repository.users.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    AdminRepository repo;

    public AdminService(AdminRepository repo) {
        this.repo = repo;
    }

    public Admin getById (Long u_id) throws ClassNotFoundException {
        return this.repo.findById(u_id).orElseThrow(ClassNotFoundException::new);
    }

    public List<Admin> getAll() {
        return this.repo.findAll();
    }

    public Admin add (Admin admin){
        return this.repo.save(admin);
    }

    public Admin update (Long u_id, Admin admin) {
        Optional<Admin> user = this.repo.findById(u_id);
        if (user.isPresent()) {
            Admin updateUser = (Admin) user.get();
            updateUser.setEmail(admin.getEmail());
            updateUser.setPswrd(admin.getPswrd());
            updateUser.setType_id(admin.getType_id());
            return this.repo.save(updateUser);
        }
        throw new RuntimeException();
    }

    public void delete (Long u_id) {
        this.repo.deleteById(u_id);
    }

    public Admin AdminLogin (String email) {
        return this.repo.findLogin(email);
    }
}
