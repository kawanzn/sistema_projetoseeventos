package com.sistemaeventos.eventos.repository;

import com.sistemaeventos.eventos.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    // o spring cria automaticamente os comandos de INSERT, SELECT, UPDATE e DELETE no banco
}