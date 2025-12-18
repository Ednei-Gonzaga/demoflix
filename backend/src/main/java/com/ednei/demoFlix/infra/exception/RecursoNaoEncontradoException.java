package com.ednei.demoFlix.infra.exception;

public class RecursoNaoEncontradoException extends RuntimeException {
    public  RecursoNaoEncontradoException(String erro){
        super(erro);
    }

}
