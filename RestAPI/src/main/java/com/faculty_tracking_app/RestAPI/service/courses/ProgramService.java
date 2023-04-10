package com.faculty_tracking_app.RestAPI.service.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Program;
import com.faculty_tracking_app.RestAPI.repository.courses.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    ProgramRepository repo;

    public ProgramService(ProgramRepository repo) {
        this.repo = repo;
    }

    public List<Program> getAll() {
        return this.repo.findAll();
    }

    public Program getById(Long pr_id) throws ClassNotFoundException {
        return this.repo.findById(pr_id).orElseThrow(ClassNotFoundException::new);
    }

    public Program add(Program program) {
        return this.repo.save(program);
    }

    public Program update(Long pr_id, Program newProgram) {
        Optional<Program> oldProgram = this.repo.findById(pr_id);
        if (oldProgram.isPresent()) {
            oldProgram.get().setPr_name(newProgram.getPr_name());
            return this.repo.save(oldProgram.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long pr_id) {
        this.repo.deleteById(pr_id);
    }
}
