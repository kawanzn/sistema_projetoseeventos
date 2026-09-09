package com.sistemaeventos.eventos.repository;

import com.sistemaeventos.eventos.model.Estrutura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstruturaRepository extends JpaRepository<Estrutura, Long> {
    // O Spring Boot cria o "SELECT * WHERE evento_id = ?"
    List<Estrutura> findByEventoId(Long eventoId);
}