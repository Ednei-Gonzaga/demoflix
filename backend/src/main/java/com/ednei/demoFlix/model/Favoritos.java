package com.ednei.demoFlix.model;

import com.ednei.demoFlix.DTO.FavoritoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Favoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String tipo;

    private String imagem;

    private String trailer;

    @Column(name = "id_tmdb")
    private Long idTmdb;

    @ManyToOne
    private Usuario usuario;

    public Favoritos(FavoritoDTO favoritoDTO, Usuario usuario) {
        this.titulo = favoritoDTO.titulo();
        this.tipo = favoritoDTO.tipo();
        this.imagem = favoritoDTO.imagem();
        this.trailer = favoritoDTO.trailer();
        this.idTmdb = favoritoDTO.idTmdb();
        this.usuario = usuario;
    }
}
