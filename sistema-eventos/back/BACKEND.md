Back-end changes
----------------

- Adicionado `spring-boot-starter-security` e dependências `jjwt` no `pom.xml`.
- Novas classes em `com.sistemaeventos.eventos.auth`:
  - `AuthController` - endpoint `/api/auth/login` que autentica em memória e retorna JWT.
  - `AuthRequestDTO`, `AuthResponseDTO` - DTOs para login.
  - `JwtUtil` - utilitário simples para gerar/validar JWTs (chave em código apenas para testes).
  - `JwtFilter` - filtro que valida o token nas requisições e popula o contexto de segurança.
- Nova configuração em `com.sistemaeventos.eventos.config.SecurityConfig` que cria um usuário em memória
  (usuário `admin` / senha `admin`) e integra o filtro JWT.

Como testar localmente

1. No diretório `backend`, rode:

```bash
./mvnw clean package
./mvnw spring-boot:run
```

2. Com o backend rodando, inicie o frontend e faça login com `admin` / `admin`.

Notas de segurança importantes

- A chave usada em `JwtUtil` está no código para facilitar testes; NÃO use em produção.
- Recomendações:
  - Mover segredos para variáveis de ambiente ou secret manager.
  - Rotacionar as credenciais do banco listadas em `application.properties` (fornecidas no repositório).
  - Rever `CorsConfig` e ajustar `allowedOrigins` para remover entradas inválidas e limitar a domínios confiáveis.

Este conjunto de mudanças foi feito sem alterar os controllers existentes (`EventoController`, `EstruturaController`) e sem tocar no banco de dados.
