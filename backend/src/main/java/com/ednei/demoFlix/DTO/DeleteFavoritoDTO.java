package com.ednei.demoFlix.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record DeleteFavoritoDTO(
        @NotBlank
        String tipo,

        @NotBlank
        Long idTmdb,

        @NotBlank
        Long idUsuario
) {
}
