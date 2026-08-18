package com.sistemaeventos.eventos.service;

import com.sistemaeventos.eventos.dto.EstruturaRequestDTO;
import com.sistemaeventos.eventos.dto.EstruturaResponseDTO;
import com.sistemaeventos.eventos.model.Estrutura;
import com.sistemaeventos.eventos.model.Evento;
import com.sistemaeventos.eventos.repository.EstruturaRepository;
import com.sistemaeventos.eventos.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstruturaService {

    private final EstruturaRepository estruturaRepository;
    private final EventoRepository eventoRepository;

    public EstruturaService(EstruturaRepository estruturaRepository, EventoRepository eventoRepository) {
        this.estruturaRepository = estruturaRepository;
        this.eventoRepository = eventoRepository;
    }

    public EstruturaResponseDTO criar(EstruturaRequestDTO dto) {
        // 1. Busca o evento no banco de dados
        Evento evento = eventoRepository.findById(dto.eventoId())
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        // 2. Prepara a estrutura
        Estrutura estrutura = new Estrutura();
        estrutura.setNome(dto.nome());
        estrutura.setDescricao(dto.descricao());
        estrutura.setEvento(evento); // Faz a ligação!

        // 3. Salva no banco e devolve o DTO
        Estrutura salva = estruturaRepository.save(estrutura);
        return converterParaDto(salva);
    }

    public List<EstruturaResponseDTO> listarPorEvento(Long eventoId) {
        return estruturaRepository.findByEventoId(eventoId).stream()
                .map(this::converterParaDto)
                .toList();
    }

    private EstruturaResponseDTO converterParaDto(Estrutura estrutura) {
        return new EstruturaResponseDTO(
                estrutura.getId(),
                estrutura.getNome(),
                estrutura.getDescricao(),
                estrutura.getEvento().getId()
        );
    }
}