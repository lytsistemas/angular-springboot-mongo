package com.example.sugerencias.service;

import com.example.sugerencias.model.User;
import com.example.sugerencias.repository.UserRepository;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtEncodingException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    public User register(String email, String password, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }
        User user = new User(email, passwordEncoder.encode(password), List.of(role));
        return userRepository.save(user);
    }

    public String authenticate(String email, String password) {
        // 1. Buscar el usuario en la base de datos
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // 2. Verificar la contraseña
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }

        // 3. Generar el JWT
        Instant now = Instant.now();
        List<String> scope = user.getRoles(); // Puedes configurar roles o permisos si es necesario

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("sugerencias-app") // Configura el nombre de tu aplicación
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS)) // Configura la duración del token
                .subject(email)
                .claim("roles", scope) // Puedes añadir más información aquí
                .build();

        // Configurar explícitamente el algoritmo HS256
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        JwtEncoderParameters parameters = JwtEncoderParameters.from(header, claims);
        
        // Codificar el token
        try {
            return jwtEncoder.encode(parameters).getTokenValue();
        } catch (JwtEncodingException ex) {
            throw new RuntimeException("Error al generar el token JWT: " + ex.getMessage(), ex);
        }
    }
}
