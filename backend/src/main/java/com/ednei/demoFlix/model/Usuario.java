package com.ednei.demoFlix.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "usuario", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"})
})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nomeUsuario")
    private String nome;


    private String email;

    private String senha;


    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favoritos> favoritos;

    public String getNome() {
        return this.nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public Long getId() {
        return id;
    }

    public List<Favoritos> getFavoritos() {
        return favoritos;
    }
}
