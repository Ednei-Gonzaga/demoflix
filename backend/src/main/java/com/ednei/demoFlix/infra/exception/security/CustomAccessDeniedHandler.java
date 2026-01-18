package com.ednei.demoFlix.infra.exception.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        var jsonBody = objectMapper.writeValueAsString(new padraoErro(false, "Usuario não tem permição para acesso!"));

        response.setStatus(403);
        response.setContentType("application/json");
        response.getWriter().write(jsonBody);
    }

    private record padraoErro(Boolean situacao, String mensagem){}
}
