package com.ednei.demoFlix.DTO;

public record DeleteFavoritoDTO(
        String tipo,
        Long idTmdb,
        Long idUsuario
) {
}
