package com.ednei.demoFlix.repository;

import com.ednei.demoFlix.model.Favoritos;
import com.ednei.demoFlix.model.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favoritos, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Favoritos f WHERE f.tipo = :tipoFavorito AND f.idTmdb = :idTmdb AND f.usuario.id = :idUsuario")
    void deletarFavorito(String tipoFavorito,Long idTmdb, Long idUsuario);


    List<Favoritos> findAllByUsuarioId(Long idUsuario);



}

