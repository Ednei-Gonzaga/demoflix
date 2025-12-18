package com.ednei.demoFlix.infra.exception;

public class AcessoNegadoException extends RuntimeException{
    public AcessoNegadoException(String erro){
        super(erro);
    }
}
