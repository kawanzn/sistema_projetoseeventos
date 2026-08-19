// Essa classe permite as requisições do React
package com.sistemaeventos.eventos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Habilita o CORS para todos os endpoints da API
                registry.addMapping("/**") 
                        // Libera as portas locais usadas pelo React e a porta usada no Vercel
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173", "https://sistema-eventos-six.vercel.app") 
                        // Permite os métodos HTTP
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}