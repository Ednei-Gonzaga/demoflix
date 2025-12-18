package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UsuarioDTO(
    Long id,

    @NotBlank
    String nome,

    @NotBlank
    @Email(message = "O email deve seguir esse padrão 'teste@gmail.com'")
    String email,

    @NotBlank
    @Pattern(regexp = "\\d{8,16}", message = "Senha deve ser no minimo 8 e máximo 16")
    String senha
) {
}
