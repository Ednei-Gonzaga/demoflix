package com.ednei.demoFlix.DTO;

import com.ednei.demoFlix.model.Usuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DetalheUsuarioDTO(
        @NotNull
        Long id,

        @NotBlank
        String nome,

        @NotBlank
        String email
){
        public DetalheUsuarioDTO(UsuarioDTO usuario) {
                this (usuario.id(), usuario.nome(), usuario.email());
        }

    public DetalheUsuarioDTO(Usuario usuario) {
            this(usuario.getId(),usuario.getNome(),usuario.getEmail());
    }
}
