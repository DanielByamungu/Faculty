package com.faculty_tracking_app.RestAPI.service.courses;

import com.faculty_tracking_app.RestAPI.persistence.courses.Course;
import com.faculty_tracking_app.RestAPI.persistence.courses.CoursesTaught;
import com.faculty_tracking_app.RestAPI.persistence.users.Faculty;
import com.faculty_tracking_app.RestAPI.repository.courses.CourseRepository;
import com.faculty_tracking_app.RestAPI.repository.courses.CoursesTaughtRepository;
import com.faculty_tracking_app.RestAPI.repository.courses.SectionRepository;
import com.faculty_tracking_app.RestAPI.repository.courses.TermRepository;
import com.faculty_tracking_app.RestAPI.repository.schedules.FacultyAvailabilityRepository;
import com.faculty_tracking_app.RestAPI.repository.users.FacultyRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesTaughtService {

    CoursesTaughtRepository repo;
    FacultyRepository fRepo;
    CourseRepository cRepo;
    SectionRepository sRepo;
    TermRepository tRepo;

    public CoursesTaughtService(
            CoursesTaughtRepository repo,
            FacultyRepository fRepo,
            CourseRepository cRepo,
            SectionRepository sRepo,
            TermRepository tRepo) {
        this.repo = repo;
        this.fRepo = fRepo;
        this.cRepo = cRepo;
        this.sRepo = sRepo;
        this.tRepo = tRepo;
    }

    public List<CoursesTaught> getAll() {
        return this.repo.findAll();
    }

    public CoursesTaught getByIds(Long course_id, Long u_id) {
        return this.repo.getByTwoIds(course_id, u_id);
    }

    public List<Faculty> getAllUsersTeachingCourse (Long course_id) {
        List<Long> ids = this.repo.getAllUsersForCourse(course_id);
        List<Faculty> users = new ArrayList<>();
        for (Long id : ids) {
            Optional<Faculty> faculty = this.fRepo.findById(id);
            faculty.ifPresent(users::add);
        }
        return users;
    }

    public List<CoursesTaught> getAllCourseForUser (Long u_id) {
        return this.repo.getAllCoursesForUser(u_id);
    }

    public CoursesTaught add(CoursesTaught scheduleCT) {
        return this.repo.save(scheduleCT);
    }

    public void delete(Long course_id, Long u_id) {
        this.repo.deleteByTwoIds(u_id, course_id);
    }

    public Long getCourseId (String course_code, Long section_number, String term_name)  {
        Long section_id = this.sRepo.getSectionID(section_number);
        Long term_id = this.tRepo.getTermID(term_name);
        return this.repo.getCourseIdForCoursesTaught(course_code, section_id, term_id);
    }

    @Modifying
    @Transactional
    public void deleteAllByUserId (Long u_id) {
        this.repo.deleteAllByU_id(u_id);
    }
}
