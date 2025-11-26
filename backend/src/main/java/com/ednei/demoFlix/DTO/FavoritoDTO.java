package com.ednei.demoFlix.DTO;

public record FavoritoDTO(
        String tipo,
        Long idTmdb,
        String titulo,
        String imagem,
        String trailer,
        Long usuario
) {
}
