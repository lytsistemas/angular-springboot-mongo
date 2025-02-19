package com.example.sugerencias.model;

import lombok.Data;

@Data
public class Request {
    private String email;
    private String password;
    private String role;

    // Getters y setters
}
