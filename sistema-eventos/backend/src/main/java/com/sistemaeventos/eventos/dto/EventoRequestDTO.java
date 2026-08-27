package com.sistemaeventos.eventos.dto;

import com.sistemaeventos.eventos.model.enums.StatusEvento;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventoRequestDTO(
        String nome,
        String local,
        LocalDate dataMontagem,
        LocalDate dataEvento,
        LocalTime horaEvento,
        LocalDate dataDesmontagem,
        String responsavel,
        String observacoes,
        StatusEvento status
        
) {}