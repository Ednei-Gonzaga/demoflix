package com.ednei.demoFlix.infra;

import com.ednei.demoFlix.infra.exception.AcessoNegadoException;
import com.ednei.demoFlix.infra.exception.RecursoNaoEncontradoException;
import com.ednei.demoFlix.infra.exception.RegraDeNegocioException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class TradadorErros {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity tratarError400(MethodArgumentNotValidException ex) {
        var errors = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(errors.stream().map(DadosErrosValidacao::new).toList());
    }


    @ExceptionHandler(RegraDeNegocioException.class)
    public ResponseEntity tratarRegraNegocio(RegraDeNegocioException ex) {
        List<DadosErroPadrao> retornoErro = new ArrayList<>();
        retornoErro.add(new DadosErroPadrao(ex.getMessage()));
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(retornoErro);
    }

    @ExceptionHandler(AcessoNegadoException.class)
    public ResponseEntity acessoNaoAutorizado(AcessoNegadoException ex) {
        List<DadosErroPadrao> retornoErro = new ArrayList<>();
        retornoErro.add(new DadosErroPadrao(ex.getMessage()));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(retornoErro);
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity naoEncontrado(RecursoNaoEncontradoException ex) {
        List<DadosErroPadrao> retornoErro = new ArrayList<>();
        retornoErro.add(new DadosErroPadrao(ex.getMessage()));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DadosErroPadrao(ex.getMessage()));
    }


    private record DadosErrosValidacao(String nome, String mensagem, Boolean situacao) {
        public DadosErrosValidacao(FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage(), false);
        }
    }

    private record DadosErroPadrao(String mensagem, Boolean situacao) {
        public DadosErroPadrao(String erro) {
            this(erro, false);
        }
    }
}