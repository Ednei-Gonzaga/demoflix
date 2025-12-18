package com.ednei.demoFlix.repository;

import com.ednei.demoFlix.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    void deleteByEmail(String email);

    Optional<Usuario> findByEmailAndSenha(String email, String senha);

    Boolean existsByEmail(String email);
}
