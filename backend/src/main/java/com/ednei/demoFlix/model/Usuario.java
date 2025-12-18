package com.ednei.demoFlix.model;

import com.ednei.demoFlix.DTO.UsuarioDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@Table(name = "usuarios")
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_usuario")

    private String nome;

    @Email
    private String email;

    private String senha;

    @OneToMany(mappedBy = "usuario")
    //, cascade = CascadeType.ALL, orphanRemoval = true
    private List<Favoritos> favoritos;


    public Usuario(UsuarioDTO usuario) {
        this.email = usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
    }
}
