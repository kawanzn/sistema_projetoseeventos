// classe que guarda as estruturas do evento
package com.sistemaeventos.eventos.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estruturas")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Estrutura {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome da estrutura (Ex: Palco, LED, Iluminação)
    @Column(nullable = false, length = 100)
    private String nome;

    // Quantidade ou detalhes adicionais (Ex: "2 tendas de 5x5")
    @Column(length = 150)
    private String descricao;

    // Relacionamento: Várias estruturas pertencem a UM evento
    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;
}
