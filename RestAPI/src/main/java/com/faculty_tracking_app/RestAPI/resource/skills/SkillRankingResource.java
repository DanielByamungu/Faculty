package com.faculty_tracking_app.RestAPI.resource.skills;

import com.faculty_tracking_app.RestAPI.persistence.skills.SkillRankings;
import com.faculty_tracking_app.RestAPI.service.skills.SkillRankingsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class SkillRankingResource {
    SkillRankingsService service;

    public SkillRankingResource(SkillRankingsService service) {
        this.service = service;
    }

    @GetMapping(value = "/skillrankings")
    public List<SkillRankings> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/skillrankings/{ranking_id}")
    public SkillRankings getById(@PathVariable Long ranking_id) throws ClassNotFoundException {
        return service.getById(ranking_id);
    }

    @PostMapping(value = "/skillrankings", consumes = "application/json")
    public SkillRankings add(@RequestBody SkillRankings newRanking) {
        return service.add(newRanking);
    }

    @PutMapping(value = "/skillrankings/{ranking_id}")
    public SkillRankings update(@PathVariable Long ranking_id, @RequestBody SkillRankings ranking) {
        return service.update(ranking_id, ranking);
    }

    @DeleteMapping(value = "/skillrankings/{ranking_id}")
    public void delete(@PathVariable Long ranking_id) {
        service.delete(ranking_id);
    }
}
