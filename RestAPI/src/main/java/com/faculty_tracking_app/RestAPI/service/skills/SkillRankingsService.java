package com.faculty_tracking_app.RestAPI.service.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.SkillRankings;
import com.faculty_tracking_app.RestAPI.repository.skills.SkillRankingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillRankingsService {
    SkillRankingsRepository repo;

    public SkillRankingsService(SkillRankingsRepository repo) {this.repo = repo;}

    public List<SkillRankings> getAll() {return this.repo.findAll();}

    public SkillRankings getById (Long ranking_id) throws ClassNotFoundException {
        return this.repo.findById(ranking_id).orElseThrow(ClassNotFoundException::new);
    }

    public SkillRankings add (SkillRankings newRanking) {return this.repo.save(newRanking);}

    public SkillRankings update (Long ranking_id, SkillRankings ranking) {
        Optional<SkillRankings> currentRanking = this.repo.findById(ranking_id);
        if (currentRanking.isPresent()) {
            currentRanking.get().setRanking(ranking.getRanking());
            return this.repo.save(currentRanking.get());
        }
        throw new RuntimeException();
    }

    public void delete (Long ranking_id) {this.repo.deleteById(ranking_id);}
}
