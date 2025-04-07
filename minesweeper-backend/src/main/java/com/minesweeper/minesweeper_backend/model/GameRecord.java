package com.minesweeper.minesweeper_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class GameRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String difficulty;
    private int time; // seconds
    private LocalDateTime completedAt;

    public GameRecord() {}

    public GameRecord(String difficulty, int time) {
        this.difficulty = difficulty;
        this.time = time;
        this.completedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getTime() { return time; }
    public void setTime(int time) { this.time = time; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}