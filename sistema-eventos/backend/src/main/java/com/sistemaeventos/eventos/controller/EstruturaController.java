package com.sistemaeventos.eventos.controller;

import com.sistemaeventos.eventos.dto.EstruturaRequestDTO;
import com.sistemaeventos.eventos.dto.EstruturaResponseDTO;
import com.sistemaeventos.eventos.service.EstruturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estruturas")
public class EstruturaController {

    private final EstruturaService service;

    public EstruturaController(EstruturaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EstruturaResponseDTO> criar(@RequestBody EstruturaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    // Rota customizada: ex: GET /api/estruturas/evento/1
    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<EstruturaResponseDTO>> listarPorEvento(@PathVariable Long eventoId) {
        return ResponseEntity.ok(service.listarPorEvento(eventoId));
    }
}