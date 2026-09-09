package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UsuarioSenhaUpdateRequest(
        @NotBlank
        String codigo,

        @Pattern(regexp = ".{8,16}", message = "Senha deve ser no minimo 8 e máximo 16")
        @NotBlank
        String novaSenha,

        @Email
        @NotBlank
        String email
) {
}
