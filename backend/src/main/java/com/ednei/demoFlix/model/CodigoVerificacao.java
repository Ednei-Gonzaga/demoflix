package com.ednei.demoFlix.model;

import com.ednei.demoFlix.enums.StatusCodigoVerificacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "codigos_verificacao")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CodigoVerificacao{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    @Column(name = "criado_as")
    private LocalDateTime criadoAs;

    @Enumerated(EnumType.STRING)
    private StatusCodigoVerificacao status;

    @Column(name = "expirado_as")
    private LocalDateTime expiradoAs;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public CodigoVerificacao(String codigo, Usuario usuario) {
        this.codigo = codigo;
        this.usuario = new Usuario(usuario.getId());
        this.criadoAs = LocalDateTime.now();
        this.status = StatusCodigoVerificacao.ATIVO;
        this.expiradoAs = criadoAs.plusMinutes(15);
    }

    public void atualizarStatus() {
        this.status = StatusCodigoVerificacao.USADO;
    }
}
