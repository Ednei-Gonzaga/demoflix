package com.ednei.demoFlix.service;

import com.ednei.demoFlix.DTO.DetalheUsuarioDTO;
import com.ednei.demoFlix.infra.exception.AcessoNegadoException;
import com.ednei.demoFlix.infra.exception.RecursoNaoEncontradoException;
import com.ednei.demoFlix.infra.exception.RegraDeNegocioException;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

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
            var user =  new DetalheUsuarioDTO(usuario.get());
            return user;
        } else {
            throw  new AcessoNegadoException("Email ou Senha estão incorretos!") ;
        }
    }

    public void deletarUsuario(Long id) {
        var usuario = repository.findById(id);

        if(usuario.isPresent()){
          repository.deleteById(id);
        }else{
            throw new RecursoNaoEncontradoException("Usuario não encontrado!");
        }
    }

    public Usuario buscarPorId(Long id) {
        var usuario = repository.findById(id);
        if(usuario.isPresent()){
        return usuario.get();
        }else {
            throw new RecursoNaoEncontradoException("Usuario não encontrado!!");
        }
    }
}
