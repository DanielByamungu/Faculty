package com.faculty_tracking_app.RestAPI.service.users;

import com.faculty_tracking_app.RestAPI.persistence.users.UserTypes;
import com.faculty_tracking_app.RestAPI.repository.users.UserTypesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTypesService {

    UserTypesRepository repo;

    public UserTypesService(UserTypesRepository repo) {
        this.repo = repo;
    }

    public UserTypes getById (Long type_id) throws ClassNotFoundException {
        return this.repo.findById(type_id).orElseThrow(ClassNotFoundException::new);
    }

    public List<UserTypes> getAll() {
        return this.repo.findAll();
    }

    public UserTypes add (UserTypes type){
        return this.repo.save(type);
    }

    public UserTypes update (Long type_id, UserTypes updatedType) {
        Optional<UserTypes> type = this.repo.findById(type_id);
        if (type.isPresent()) {
            type.get().setType_name(updatedType.getType_name());
            return this.repo.save(type.get());
        }
        throw new RuntimeException();
    }

    public void delete (Long type_id) {
        this.repo.deleteById(type_id);
    }
}
