// Tabela principal que guarda as informações do evento (nome, local, data etc...)
package com.sistemaeventos.eventos.model;

import com.sistemaeventos.eventos.model.enums.StatusEvento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "eventos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 150)
    private String local;

    @Column(name = "data_montagem")
    private LocalDate dataMontagem;

    @Column(name = "data_evento", nullable = false)
    private LocalDate dataEvento;

    @Column(name = "data_desmontagem")
    private LocalDate dataDesmontagem;

    @Column(length = 100)
    private String responsavel;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEvento status = StatusEvento.SOLICITADO;
    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<Estrutura> estruturas = new java.util.ArrayList<>();
}