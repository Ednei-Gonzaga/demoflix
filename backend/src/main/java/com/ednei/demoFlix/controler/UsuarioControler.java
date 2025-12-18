package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.DeleteUsuarioDTO;
import com.ednei.demoFlix.DTO.DetalheUsuarioDTO;
import com.ednei.demoFlix.DTO.LoginUsuarioDTO;
import com.ednei.demoFlix.DTO.UsuarioDTO;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.service.UsuarioService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuario")
public class UsuarioControler {
    @Autowired
    UsuarioService service;


    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity cadastrarUsuario(@RequestBody @Valid UsuarioDTO usuario) {
        Usuario user = service.salvarUsuario(new Usuario(usuario));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("situacao", true, "mensagem", "Criado com Sucesso!"));
    }

    @PostMapping("/login")
    @Transactional
    public ResponseEntity login(@RequestBody @Valid LoginUsuarioDTO usuario) {
        var user = service.buscaLogin(usuario.email(), usuario.senha());
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("situacao", true,
                "mensagem", "Logado com sucesso!", "usuario", user));
    }

    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity deletarUsuario(@RequestBody @Valid DeleteUsuarioDTO usuario) {

            service.deletarUsuario(usuario.id());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
