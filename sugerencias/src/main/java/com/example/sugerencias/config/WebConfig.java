package com.example.sugerencias.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permitir todas las rutas
                        .allowedOrigins("http://localhost:4200") // Cambia por el origen de tu app Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                        .allowedHeaders("*") // Permitir todas las cabeceras
                        .allowCredentials(true); // Permitir credenciales como cookies o Authorization headers
            }
        };
    }
}
