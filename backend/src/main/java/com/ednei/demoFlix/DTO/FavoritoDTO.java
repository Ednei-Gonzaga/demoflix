package com.ednei.demoFlix.DTO;

import com.ednei.demoFlix.model.Favoritos;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FavoritoDTO(
        @NotBlank
        String tipo,

        @NotNull
        Long idTmdb,

        @NotBlank
        String titulo,

        String imagem,

        String trailer,

        @NotNull
        Long usuario
) {
    public FavoritoDTO(Favoritos f) {
        this(f.getTipo(), f.getIdTmdb(), f.getTitulo(), f.getImagem(), f.getTrailer(), f.getUsuario().getId());
    }
}
