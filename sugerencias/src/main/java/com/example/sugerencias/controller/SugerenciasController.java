package com.example.sugerencias.controller;

import com.example.sugerencias.model.Sugerencia;
import com.example.sugerencias.repository.SugerenciaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sugerencias")
public class SugerenciasController {

    private final SugerenciaRepository sugerenciaRepository;

    public SugerenciasController(SugerenciaRepository sugerenciaRepository) {
        this.sugerenciaRepository = sugerenciaRepository;
    }

    @PostMapping
    public ResponseEntity<?> addSugerencia(@RequestBody Sugerencia sugerencia) {
        return ResponseEntity.ok(sugerenciaRepository.save(sugerencia));
    }

    @GetMapping
    public ResponseEntity<List<Sugerencia>> getAllSugerencias() {
        return ResponseEntity.ok(sugerenciaRepository.findAll());
    }
}
