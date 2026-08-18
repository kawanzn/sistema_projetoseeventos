package com.sistemaeventos.eventos.dto;

public record EstruturaRequestDTO(
        String nome,
        String descricao,
        Long eventoId
) {}