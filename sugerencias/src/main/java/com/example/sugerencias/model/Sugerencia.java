package com.example.sugerencias.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class Sugerencia {
	@Id
    private String id;
    private String texto;
    private String usuario;

    public Sugerencia(String texto, String usuario) {
		this.texto = texto;
		this.usuario = usuario;
	}
    // Getters y setters
}