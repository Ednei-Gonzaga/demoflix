package com.ednei.demoFlix.service;

import com.ednei.demoFlix.DTO.DetalheUsuarioDTO;
import com.ednei.demoFlix.DTO.UsuarioSenhaUpdateRequest;
import com.ednei.demoFlix.enums.StatusCodigoVerificacao;
import com.ednei.demoFlix.infra.exception.AcessoNegadoException;
import com.ednei.demoFlix.infra.exception.RecursoNaoEncontradoException;
import com.ednei.demoFlix.infra.exception.RegraDeNegocioException;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.repository.CodigoVerificacaoRepository;
import com.ednei.demoFlix.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private CodigoVerificacaoRepository codigoVerificacaoRepository;

    @Autowired
    private JavaEmailService javaEmailService;

    public Usuario salvarUsuario(Usuario usuario) {
        if (repository.existsByEmail(usuario.getEmail())) {
            throw new RegraDeNegocioException("O email " + usuario.getEmail() + " já está em uso.");
        } else {
            return repository.save(usuario);
        }
    }

    public DetalheUsuarioDTO buscaLogin(String email, String senha) {
        Optional<Usuario> usuario = repository.findByEmailAndSenha(email, senha);
        if (usuario.isPresent()) {
            var user = new DetalheUsuarioDTO(usuario.get());
            return user;
        } else {
            throw new AcessoNegadoException("Email ou Senha estão incorretos!");
        }
    }

    public void deletarUsuario(Long id) {
        var usuario = repository.findById(id);

        if (usuario.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new RecursoNaoEncontradoException("Usuario não encontrado!");
        }
    }

    public Usuario buscarPorId(Long id) {
        var usuario = repository.findById(id);
        if (usuario.isPresent()) {
            return usuario.get();
        } else {
            throw new RecursoNaoEncontradoException("Usuario não encontrado!!");
        }
    }

    public UserDetails buscarPorEmail(String email) {
        var usuario = repository.findByEmail(email);
        if (usuario.isPresent()) {
            return usuario.get();
        } else {
            throw new RecursoNaoEncontradoException("Usuario não encontrado!!");
        }
    }

    @Transactional
    public void atualizarSenha(UsuarioSenhaUpdateRequest usuarioDto) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        verificarSeCodigoValido(usuarioDto.codigo(), usuarioDto.email());

        var usuario = repository.findByEmail(usuarioDto.email());
        var codigoVerificacao = codigoVerificacaoRepository.findByCodigo(usuarioDto.codigo());

        codigoVerificacao.get().atualizarStatus();
        usuario.get().atualizarSenha(bCryptPasswordEncoder.encode(usuarioDto.novaSenha()));

        repository.save(usuario.get());

        javaEmailService.sendEmail(usuarioDto.email(), "Alteração de Senha", "Sua senha foi alterada, como você pediu. Você já pode acessar o TechFix com as novas informações de LOGIN.");
    }

    //Metodos privados
    private void verificarSeCodigoValido(String codigo, String email) {
        var codigoVerificacao = codigoVerificacaoRepository.findByCodigo(codigo);
        var usuario = repository.findByEmail(email);

        if (usuario.isEmpty() ||
                codigoVerificacao.isEmpty() ||
                !usuario.get().getId().equals(codigoVerificacao.get().getUsuario().getId()) ||
                    codigoVerificacao.get().getExpiradoAs().isBefore(LocalDateTime.now())
                      || codigoVerificacao.get().getStatus() != StatusCodigoVerificacao.ATIVO) {
            throw new RegraDeNegocioException("Código incorreto, expirado ou dados não conferem. Solicite um novo código se necessário");
        }
    }
}
