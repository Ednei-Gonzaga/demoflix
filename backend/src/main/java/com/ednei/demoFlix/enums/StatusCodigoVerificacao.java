package com.ednei.demoFlix.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum StatusCodigoVerificacao{
    ATIVO ("active"),
    USADO ("used"),
    EXPIRADO ("expired");

    public String opcaoPortugues;
    StatusCodigoVerificacao(String value){
        this.opcaoPortugues = value;
    }

    @JsonCreator
    public static StatusCodigoVerificacao forValue(String value){
        for (StatusCodigoVerificacao status : StatusCodigoVerificacao.values()) {
            if(status.opcaoPortugues.equalsIgnoreCase(value) || status.name().equalsIgnoreCase(value)){
                return status;
            }
        }
        return null;
    }
}
