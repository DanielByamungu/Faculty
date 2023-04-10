package com.faculty_tracking_app.RestAPI.service.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Term;
import com.faculty_tracking_app.RestAPI.repository.courses.TermRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TermService {

    TermRepository repo;

    public TermService(TermRepository repo) {
        this.repo = repo;
    }

    public List<Term> getAll() {
        return this.repo.findAll();
    }

    public Term getById(Long term_id) throws ClassNotFoundException {
        return this.repo.findById(term_id).orElseThrow(ClassNotFoundException::new);
    }

    public Term add(Term term) {
        return this.repo.save(term);
    }

    public Term update(Long term_id, Term newTerm) {
        Optional<Term> oldTerm = this.repo.findById(term_id);
        if (oldTerm.isPresent()) {
            oldTerm.get().setTerm_name(newTerm.getTerm_name());
            return this.repo.save(oldTerm.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long term_id) {
        this.repo.deleteById(term_id);
    }
}
