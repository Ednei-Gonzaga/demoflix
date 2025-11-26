package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.UsuarioDTO;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuario")
public class UsuarioControler {
    @Autowired
    UsuarioService service;


    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario){
    try {
        Usuario  user = service.salvarUsuario(usuario);
        return  ResponseEntity.status(HttpStatus.CREATED).body(Map.of("situacao", "Conta criada com sucesso!", "login", true));
    }catch (DataIntegrityViolationException e){

        return ResponseEntity
                .status(HttpStatus.CONFLICT) //
                .body(Map.of("situacao", "Email já cadastrado!", "login",  false));
    }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        var verificacao = service.buscaLogin(usuario.getEmail(), usuario.getSenha());

        if(verificacao.isPresent()){

            var user =  verificacao.stream()
                    .map(f -> new UsuarioDTO(f.getId(), f.getNome(),f.getEmail()));

            return  ResponseEntity.status(HttpStatus.OK).body(Map.of("login",true,
                    "situacao", "Logado com sucesso!", "usuario", user));
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("login",false,
                    "situacao", "Email ou senha incorreto!"));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletarUsuario(@RequestBody Usuario usuario){
        try{
            service.deletarUsuario(usuario.getId());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
