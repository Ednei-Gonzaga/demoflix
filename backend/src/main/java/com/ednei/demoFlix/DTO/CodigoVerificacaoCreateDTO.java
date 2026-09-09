package com.ednei.demoFlix.DTO;

import jakarta.validation.constraints.Email;

public record CodigoVerificacaoCreateDTO(
        @Email
        String email
) {
}
