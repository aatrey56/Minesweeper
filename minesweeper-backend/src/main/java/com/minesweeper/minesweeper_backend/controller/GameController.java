package com.minesweeper.minesweeper_backend.controller;

import com.minesweeper.minesweeper_backend.model.GameRecord;
import com.minesweeper.minesweeper_backend.repository.GameRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRecordRepository repo;

    @PostMapping
    public GameRecord saveGame(@RequestBody GameRecord record) {
        record.setCompletedAt(LocalDateTime.now());
        return repo.save(record);
    }

    @GetMapping("/leaderboard/{difficulty}")
    public List<GameRecord> getLeaderboard(@PathVariable String difficulty) {
        return repo.findTop10ByDifficultyOrderByTimeAsc(difficulty);
    }
}
