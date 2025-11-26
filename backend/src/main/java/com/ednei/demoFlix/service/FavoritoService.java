package com.ednei.demoFlix.service;

import com.ednei.demoFlix.DTO.FavoritoDTO;
import com.ednei.demoFlix.model.Favoritos;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoritoService {
    @Autowired
    private FavoritoRepository repository;

    @Autowired
    private UsuarioService usuarioService;


    public Favoritos salvarFavorito(FavoritoDTO favoritoDTO){
        Usuario usuario = usuarioService.buscarPorId(favoritoDTO.usuario());

        System.out.println(usuario.getNome());

        Favoritos favorito = new Favoritos();
        favorito.setTitulo(favoritoDTO.titulo());
        favorito.setTipo(favoritoDTO.tipo());
        favorito.setImagem(favoritoDTO.imagem());
        favorito.setTrailer(favoritoDTO.trailer());
        favorito.setIdTmdb(favoritoDTO.idTmdb());
        favorito.setUsuario(usuario);

        System.out.println(favorito.getUsuario());

        return repository.save(favorito);
    }

    public void deletarFavorito(String tipo, Long tmdbId, Long id){
        repository.deletarFavorito(tipo,tmdbId, id);
    }



    public List<FavoritoDTO> buscarFavoritos(Long idUsuario){
        List<FavoritoDTO> favoritoDTO = repository.findAllByUsuarioId(idUsuario).stream()
                .map(f -> new FavoritoDTO(f.getTipo(), f.getIdTmdb(), f.getTitulo(), f.getImagem(), f.getTrailer(), f.getUsuario().getId()))
                .collect(Collectors.toList());

        return favoritoDTO;
    }

    private List<Favoritos> buscar(Long idUsuario){
        List<Favoritos> favoritos = repository.findAllByUsuarioId(idUsuario);
        return favoritos;
    }
}
