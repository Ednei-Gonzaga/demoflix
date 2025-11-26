package com.ednei.demoFlix.service;

import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

   // @Autowired
   // FavoritoService favoritoService;

    public Usuario salvarUsuario(Usuario usuario){
        return repository.save(usuario);
    }

    public Optional<Usuario> buscaLogin(String email, String senha){
        Optional<Usuario> usuario  = repository.findByEmailAndSenha(email, senha);
        return usuario;
    }

    public void deletarUsuario(Long id){
       // favoritoService.deletarFavoritoPorIdUsuario(id);
        repository.deleteById(id);
    }

    public Usuario buscarPorId(Long id){
        Usuario usuario = repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));;
        return  usuario;
    }
}
