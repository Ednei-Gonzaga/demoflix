package com.ednei.demoFlix.model;

import com.ednei.demoFlix.DTO.FavoritoDTO;
import com.ednei.demoFlix.service.UsuarioService;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
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


    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTipo() {
        return tipo;
    }

    public String getImagem() {
        return imagem;
    }

    public String getTrailer() {
        return trailer;
    }

    public Long getIdTmdb() {
        return idTmdb;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public void setIdTmdb(Long idTmdb) {
        this.idTmdb = idTmdb;
    }
}
