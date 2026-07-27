package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginUsuarioDTO(
        @Email
        String email,

        @NotBlank
        String senha
) {
}
