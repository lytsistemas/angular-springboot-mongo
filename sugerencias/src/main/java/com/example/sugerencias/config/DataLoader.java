package com.example.sugerencias.config;

import com.example.sugerencias.model.Sugerencia;
import com.example.sugerencias.model.User;
import com.example.sugerencias.repository.SugerenciaRepository;
import com.example.sugerencias.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SugerenciaRepository sugerenciaRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, 
    					PasswordEncoder passwordEncoder,
    					SugerenciaRepository sugerenciaRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.sugerenciaRepository = sugerenciaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.deleteAll();
        sugerenciaRepository.deleteAll();

        User admin = new User("admin@example.com", passwordEncoder.encode("admin123"), List.of("ADMIN"));
        User user = new User("user@example.com", passwordEncoder.encode("user123"), List.of("USER"));
        Sugerencia Sugerencia = new Sugerencia("apender mongo", "user@example.com");

        userRepository.saveAll(List.of(admin, user));
        sugerenciaRepository.save(Sugerencia);
    }
}
