package com.sistemaeventos.eventos.service;

import com.sistemaeventos.eventos.dto.EventoRequestDTO;
import com.sistemaeventos.eventos.dto.EventoResponseDTO;
import com.sistemaeventos.eventos.model.Evento;
import com.sistemaeventos.eventos.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository repository;

    public EventoService(EventoRepository repository) {
        this.repository = repository;
    }

    public EventoResponseDTO criar(EventoRequestDTO dto) {
        Evento evento = new Evento();
        evento.setNome(dto.nome());
        evento.setLocal(dto.local());
        evento.setDataMontagem(dto.dataMontagem());
        evento.setDataEvento(dto.dataEvento());
        evento.setDataDesmontagem(dto.dataDesmontagem());
        evento.setResponsavel(dto.responsavel());
        evento.setObservacoes(dto.observacoes());
        
        if (dto.status() != null) {
            evento.setStatus(dto.status());
        }

        Evento salvo = repository.save(evento);
        return converterParaDto(salvo);
    }

    public List<EventoResponseDTO> listarTodos() {
        return repository.findAll().stream()
                .map(this::converterParaDto)
                .toList();
    }

    private EventoResponseDTO converterParaDto(Evento evento) {
        return new EventoResponseDTO(
                evento.getId(), evento.getNome(), evento.getLocal(),
                evento.getDataMontagem(), evento.getDataEvento(),
                evento.getDataDesmontagem(), evento.getResponsavel(),
                evento.getObservacoes(), evento.getStatus()
        );
    }
}