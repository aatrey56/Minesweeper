package com.minesweeper.minesweeper_backend.repository;

import com.minesweeper.minesweeper_backend.model.GameRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRecordRepository extends JpaRepository<GameRecord, Long> {
    List<GameRecord> findTop10ByDifficultyOrderByTimeAsc(String difficulty);
}