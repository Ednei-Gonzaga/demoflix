package com.ednei.demoFlix.infra.exception;

public class RegraDeNegocioException extends RuntimeException{
    public RegraDeNegocioException(String erro){
        super(erro);
    }
}
