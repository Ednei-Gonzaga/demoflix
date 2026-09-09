package com.ednei.demoFlix.service;

import com.ednei.demoFlix.DTO.CodigoVerificacaoCreateDTO;
import com.ednei.demoFlix.DTO.CodigoVerificacaoFullDTO;
import com.ednei.demoFlix.model.CodigoVerificacao;
import com.ednei.demoFlix.repository.CodigoVerificacaoRepository;
import com.ednei.demoFlix.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CodigoVerificacaoService {
    @Autowired
    private CodigoVerificacaoRepository codigoVerificacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JavaEmailService javaEmailService;

    @Transactional
    public void criarCodigoVerificacao(CodigoVerificacaoCreateDTO codigoCreate) {
        var user = usuarioRepository.findByEmail(codigoCreate.email());
        var codigo = gerarCodigo();

        if (user.isPresent()) {

            while (codigoVerificacaoRepository.existsByCodigo(codigo)) {
                codigo = gerarCodigo();
            }

            var codigoVerificacao = new CodigoVerificacao(codigo, user.get());
            codigoVerificacaoRepository.save(codigoVerificacao);

            javaEmailService.sendEmail(codigoCreate.email(), "Solicitação de redefinição de senha",
                    "Se você solicitou uma redefinição de senha para " + codigoCreate.email() + ", Use o código de confirmação abaixo para concluir o processo. Se você não fez essa solicitação, ignore este e-mail.\n\nCódigo de Verificação: " + codigo);
        }
    }

    //Codigos privados
    private String gerarCodigo() {
        var random = new Random();
        String code = "";

        for (int i = 0; i < 6; i++) {
            var number = random.nextInt(10);
            code += String.valueOf(number);
        }

        return code;
    }


}
