package com.example.sugerencias.repository;

import com.example.sugerencias.model.Sugerencia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SugerenciaRepository extends MongoRepository<Sugerencia, String> {
}
