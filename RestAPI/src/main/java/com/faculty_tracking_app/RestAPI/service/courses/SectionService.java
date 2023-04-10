package com.faculty_tracking_app.RestAPI.service.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Section;
import com.faculty_tracking_app.RestAPI.repository.courses.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {

    SectionRepository repo;

    public SectionService(SectionRepository repo) {
        this.repo = repo;
    }

    public List<Section> getAll() {
        return this.repo.findAll();
    }

    public Section getById(Long section_id) throws ClassNotFoundException {
        return this.repo.findById(section_id).orElseThrow(ClassNotFoundException::new);
    }

    public Section add(Section section) {
        return this.repo.save(section);
    }

    public Section update(Long section_id, Section newSection) {
        Optional<Section> oldSection = this.repo.findById(section_id);
        if (oldSection.isPresent()) {
            oldSection.get().setSection_number(newSection.getSection_number());
            return this.repo.save(oldSection.get());
        }
        throw new RuntimeException();
    }

    public void delete(Long section_id) {
        this.repo.deleteById(section_id);
    }
}
