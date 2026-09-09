package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.DeleteUsuarioDTO;
import com.ednei.demoFlix.DTO.UsuarioDTO;
import com.ednei.demoFlix.DTO.UsuarioSenhaUpdateRequest;
import com.ednei.demoFlix.model.Usuario;
import com.ednei.demoFlix.service.UsuarioService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuario")
public class UsuarioControler {

    @Autowired
    private UsuarioService  service;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity cadastrarUsuario(@RequestBody @Valid UsuarioDTO usuario) {
        var  usuarioComSenhaBcrypt = new UsuarioDTO(usuario.id(), usuario.nome(), usuario.email(), bCryptPasswordEncoder.encode(usuario.senha()));
        Usuario user = service.salvarUsuario(new Usuario(usuarioComSenhaBcrypt));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("situacao", true, "mensagem", "Criado com Sucesso!"));
    }


    @DeleteMapping("/delete")
    @Transactional
    public ResponseEntity deletarUsuario(@RequestBody @Valid DeleteUsuarioDTO usuario) {

            service.deletarUsuario(usuario.id());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("situacao", true, "mensagem", "Deletado com sucesso!"));
    }

    @PutMapping("/senha-update")
    public ResponseEntity atualizarSenha(@RequestBody @Valid UsuarioSenhaUpdateRequest usuarioUpdateSenha) {
        service.atualizarSenha(usuarioUpdateSenha);
        return ResponseEntity.ok().build();
    }
}
