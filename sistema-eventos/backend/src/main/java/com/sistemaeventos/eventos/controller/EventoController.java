package com.sistemaeventos.eventos.controller;

import com.sistemaeventos.eventos.dto.EventoRequestDTO;
import com.sistemaeventos.eventos.dto.EventoResponseDTO;
import com.sistemaeventos.eventos.service.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EventoResponseDTO> criar(@RequestBody EventoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<EventoResponseDTO>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }
}