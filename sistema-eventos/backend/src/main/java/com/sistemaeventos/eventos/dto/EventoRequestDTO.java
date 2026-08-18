package com.sistemaeventos.eventos.dto;

import com.sistemaeventos.eventos.model.enums.StatusEvento;
import java.time.LocalDate;

public record EventoRequestDTO(
        String nome,
        String local,
        LocalDate dataMontagem,
        LocalDate dataEvento,
        LocalDate dataDesmontagem,
        String responsavel,
        String observacoes,
        StatusEvento status
) {}