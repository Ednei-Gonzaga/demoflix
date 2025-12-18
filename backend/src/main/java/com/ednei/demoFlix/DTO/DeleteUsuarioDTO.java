package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DeleteUsuarioDTO(
        @NotNull
        Long id
) {

}
