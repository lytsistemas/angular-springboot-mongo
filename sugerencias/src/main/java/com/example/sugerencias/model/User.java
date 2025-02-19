package com.example.sugerencias.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.List;
@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String email;
    private String password;
    private List<String> roles;

    public User(String email, String password, List<String> roles) {
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    // Getters y setters
}
