package com.faculty_tracking_app.RestAPI.service.documents;

import com.faculty_tracking_app.RestAPI.persistence.documents.Status;
import com.faculty_tracking_app.RestAPI.repository.documents.StatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusService {

    StatusRepository repo;

    public StatusService(StatusRepository repo) {
        this.repo = repo;
    }

    public List<Status> getAll() {
        return this.repo.findAll();
    }

    public Status getById(Long s_id) throws ClassNotFoundException {
        return this.repo.findById(s_id).orElseThrow(ClassNotFoundException::new);
    }

    public Status add(Status appStatus) {
        return this.repo.save(appStatus);
    }

    public Status update(Long s_id, Status newStatus) {
        Optional<Status> oldStatus = this.repo.findById(s_id);
        if (oldStatus.isPresent()) {
            oldStatus.get().setS_name(newStatus.getS_name());
            return this.repo.save(oldStatus.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long s_id) {
        this.repo.deleteById(s_id);
    }
}
