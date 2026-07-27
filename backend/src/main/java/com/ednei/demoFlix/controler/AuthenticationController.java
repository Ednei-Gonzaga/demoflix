package com.ednei.demoFlix.controler;
import com.ednei.demoFlix.DTO.LoginUsuarioDTO;
import com.ednei.demoFlix.infra.TokenService;
import com.ednei.demoFlix.model.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("usuario")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginUsuarioDTO dados) {
        var token = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        var authentication = manager.authenticate(token);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "situacao", true,
                "mensagem", "Logado com sucesso!",
                "token", tokenService.gerarToken((Usuario) authentication.getPrincipal())));
    }
}







































