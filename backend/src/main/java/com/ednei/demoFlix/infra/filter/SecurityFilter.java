package com.ednei.demoFlix.infra.filter;

import com.ednei.demoFlix.infra.TokenService;
import com.ednei.demoFlix.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenservice;

    @Autowired
    private UsuarioService repository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var tokenJWT = capturarToken(request);

        if(tokenJWT != null){
            var verificacao = tokenservice.validarToken(tokenJWT);
            var usuario = repository.buscarPorEmail(verificacao);

            var authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
     filterChain.doFilter(request, response);
    }

    private String capturarToken(HttpServletRequest request) {
        var token = request.getHeader("Authorization");

        if(token != null){
            return token.replace("Bearer", "").trim();
        }

        return null;
    }
}
