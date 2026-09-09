package com.ednei.demoFlix.controler;

import com.ednei.demoFlix.DTO.CodigoVerificacaoCreateDTO;
import com.ednei.demoFlix.service.CodigoVerificacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login/")
public class CodigoVerificacaoController {
    @Autowired
    private CodigoVerificacaoService codigoVerificacaoService;

    @PostMapping("codigo-verificacao")
    public ResponseEntity criarCodigoVerificacao(@RequestBody @Valid CodigoVerificacaoCreateDTO codigoVerificacao){
        System.out.println("Criando codigo-verificacao");
        codigoVerificacaoService.criarCodigoVerificacao(codigoVerificacao);
        return ResponseEntity.ok().build();
    }
}
