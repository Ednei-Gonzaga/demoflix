package com.ednei.demoFlix.infra.exception;

public class AcessoBloqueadoExeption extends RuntimeException{
    public AcessoBloqueadoExeption(String erro){
        super(erro);
    }
}
