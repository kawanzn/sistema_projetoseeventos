package com.sistemaeventos.eventos.dto;

public record EstruturaResponseDTO(
        Long id,
        String nome,
        String descricao,
        Long eventoId
) {}