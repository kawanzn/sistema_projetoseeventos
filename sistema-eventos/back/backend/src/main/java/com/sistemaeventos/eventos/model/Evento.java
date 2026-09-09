// =====================================================
// ENTIDADE EVENTO
// =====================================================
// Representa a tabela "eventos" no banco de dados.
// Guarda as principais informações de cada evento,
// como nome, local, datas, horário, responsável e status.

package com.sistemaeventos.eventos.model;

import com.sistemaeventos.eventos.model.enums.StatusEvento;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


// =====================================================
// CONFIGURAÇÃO DA ENTIDADE
// =====================================================

// Informa ao Spring/JPA que esta classe representa
// uma entidade do banco de dados.
@Entity

// Define o nome da tabela no PostgreSQL.
@Table(name = "eventos")

// Lombok cria automaticamente getters, setters,
// toString e outros métodos.
@Data

// Cria construtor sem argumentos.
@NoArgsConstructor

// Cria construtor com todos os argumentos.
@AllArgsConstructor
public class Evento {


    // =====================================================
    // IDENTIFICAÇÃO
    // =====================================================

    // Chave primária do evento.
    @Id

    // O banco gera o ID automaticamente.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // INFORMAÇÕES PRINCIPAIS
    // =====================================================

    // Ofício
    @Column(nullable = false, length = 100)
    private String oficio;

    // Nome do evento.
    // É obrigatório e aceita até 100 caracteres.
    @Column(nullable = false, length = 100)
    private String nome;


    // Local onde o evento será realizado.
    @Column(length = 150)
    private String local;


    // =====================================================
    // DATAS E HORÁRIO
    // =====================================================

    // Data prevista para montagem da estrutura.
    @Column(name = "data_montagem")
    private LocalDate dataMontagem;


    // Data principal do evento.
    // Este campo é obrigatório.
    @Column(name = "data_evento", nullable = false)
    private LocalDate dataEvento;


    // NOVO CAMPO:
    // Horário em que o evento será realizado.
    //
    // LocalTime é utilizado porque precisamos apenas
    // da hora, sem armazenar uma nova data.
    //
    // Exemplo:
    // 14:30
    @Column(name = "hora_evento")
    private LocalTime horaEvento;


    // Data prevista para desmontagem da estrutura.
    @Column(name = "data_desmontagem")
    private LocalDate dataDesmontagem;


    // =====================================================
    // RESPONSÁVEL E OBSERVAÇÕES
    // =====================================================

    // Pessoa responsável pelo evento.
    @Column(length = 100)
    private String responsavel;


    // Campo de texto livre para observações.
    // TEXT permite armazenar textos maiores.
    @Column(columnDefinition = "TEXT")
    private String observacoes;


    // =====================================================
    // STATUS DO EVENTO
    // =====================================================

    // Salva o nome do status no banco.
    //
    // Exemplos:
    // SOLICITADO
    // CONFIRMADO
    // CONCLUIDO
    @Enumerated(EnumType.STRING)

    @Column(nullable = false)
    private StatusEvento status = StatusEvento.SOLICITADO;


    // =====================================================
    // ESTRUTURAS DO EVENTO
    // =====================================================

    // Um evento pode possuir várias estruturas.
    //
    // mappedBy = "evento":
    // informa que a relação é controlada pela
    // propriedade "evento" da classe Estrutura.
    //
    // cascade:
    // alterações no evento também podem ser aplicadas
    // às estruturas relacionadas.
    //
    // orphanRemoval:
    // remove estruturas que deixarem de pertencer
    // ao evento.
    @OneToMany(
        mappedBy = "evento",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Estrutura> estruturas = new ArrayList<>();

}