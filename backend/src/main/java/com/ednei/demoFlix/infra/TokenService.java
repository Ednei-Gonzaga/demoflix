package com.ednei.demoFlix.infra;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ednei.demoFlix.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {
    @Value("${senha_algoritimo}")
    private String senha;

    public String gerarToken(Usuario usuario){
        try {
            Algorithm algorithm = Algorithm.HMAC256(senha);
            String token = JWT.create()
                    .withIssuer("API DemoFlix")
                    .withSubject(usuario.getEmail())
                    .withClaim("nome", usuario.getNome())
                    .withExpiresAt(dataExpiracao())
                    .withClaim("id", usuario.getId())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            return  exception.getMessage();
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().toInstant(ZoneOffset.of("-03:00"))
                .plusSeconds(7200);
    }

    public String validarToken(String tokenJWT){
        try {
            Algorithm algorithm = Algorithm.HMAC256(senha);
            return JWT.require(algorithm)
                    .withIssuer("API DemoFlix")
                    .build()
                    .verify(tokenJWT)
                    .getSubject();

        } catch (JWTVerificationException exception){
            throw new RuntimeException("Token é invalido!");
        }
    }

}
