package com.ednei.demoFlix.DTO;

import com.ednei.demoFlix.model.CodigoVerificacao;

import java.time.LocalDateTime;

public record CodigoVerificacaoFullDTO(
        Long id,
        String codigo,
        LocalDateTime criadoAs,
        String status,
        LocalDateTime expiradoAs,
        Long usuario
) {
    CodigoVerificacaoFullDTO(CodigoVerificacao codigoVerificacao){
        this(codigoVerificacao.getId(), codigoVerificacao.getCodigo(), codigoVerificacao.getCriadoAs(), codigoVerificacao.getStatus().name(), codigoVerificacao.getExpiradoAs(),codigoVerificacao.getUsuario().getId());
    }
}
