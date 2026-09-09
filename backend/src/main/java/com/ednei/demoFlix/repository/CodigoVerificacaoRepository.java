package com.ednei.demoFlix.repository;

import com.ednei.demoFlix.model.CodigoVerificacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CodigoVerificacaoRepository extends JpaRepository<CodigoVerificacao, Long> {
    boolean existsByCodigo(String codigo);

    Optional<CodigoVerificacao> findByCodigo(String codigo);
}
