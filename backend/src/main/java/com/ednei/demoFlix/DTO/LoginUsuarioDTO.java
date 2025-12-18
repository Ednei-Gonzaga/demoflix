package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginUsuarioDTO(
        @Email
        String email,

        @NotBlank
        @Pattern(regexp = "\\d{8,16}", message = "Deve ser no minimo 8 e máximo 16")
        String senha
) {
}
