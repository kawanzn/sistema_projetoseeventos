// ==========================================================
// CONFIGURAÇÃO DE CORS
// ==========================================================
//
// Essa classe permite que o nosso front-end em React
// faça requisições para o back-end em Spring Boot.

package com.sistemaeventos.eventos.config;


// ==========================================================
// IMPORTAÇÕES
// ==========================================================

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// ==========================================================
// CLASSE DE CONFIGURAÇÃO
// ==========================================================
//
// @Configuration informa ao Spring Boot que esta classe
// possui configurações da aplicação.
//
@Configuration
public class CorsConfig {


    // ======================================================
    // CONFIGURAÇÃO DO CORS
    // ======================================================
    //
    // @Bean faz com que o Spring utilize essa configuração
    // quando a aplicação for iniciada.
    //
    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // ===========================================
                // ROTAS LIBERADAS
                // ===========================================
                //
                // "/**" significa que essa configuração
                // será aplicada em todas as rotas.
                //
                registry.addMapping("/**")


                        // =====================================
                        // FRONT-ENDS PERMITIDOS
                        // =====================================
                        //
                        // localhost:3000:
                        // caso utilizemos React nessa porta.
                        //
                        // localhost:5173:
                        // porta utilizada pelo Vite.
                        //
                        // sistema-eventos-six.vercel.app:
                        // nosso React publicado na Vercel.
                        //
                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://localhost:5173",
                                "https://sistema-eventos-six.vercel.app"
                        )


                        // =====================================
                        // MÉTODOS HTTP PERMITIDOS
                        // =====================================
                        //
                        // GET    -> buscar
                        // POST   -> cadastrar
                        // PUT    -> atualizar
                        // DELETE -> excluir
                        // OPTIONS -> utilizado pelo CORS
                        //
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )


                        // Permite os cabeçalhos enviados
                        // pelo nosso front-end.
                        .allowedHeaders("*")


                        // Permite requisições que utilizem
                        // credenciais, caso precisemos delas.
                        .allowCredentials(true);
            }
        };
    }
}