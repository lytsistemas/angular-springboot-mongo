package com.example.sugerencias.controller;

import com.example.sugerencias.model.Request;
import com.example.sugerencias.service.AuthService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Request request) {
    	String email = request.getEmail();
        String password = request.getPassword();
        String role = request.getRole();
        try {
        	authService.register(email, password, role);
            return ResponseEntity.ok(Map.of("message", "Usuario registrado con éxito"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    	
    }	
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Request request) {
    	String email = request.getEmail();
        String password = request.getPassword();
        try {
        	 String token = authService.authenticate(email, password);
             HttpHeaders headers = new HttpHeaders();
             headers.set("Authorization", "Bearer " + token); // Configurar el token en los headers
             return ResponseEntity.ok().headers(headers).body(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
        
       
        
        
    }
}
