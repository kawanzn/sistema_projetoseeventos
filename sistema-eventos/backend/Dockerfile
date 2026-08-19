# ==========================================
# Estágio 1: Construção (Build)
# ==========================================
FROM eclipse-temurin:26-jdk AS build
WORKDIR /app

# Copia os arquivos do Maven e do projeto
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Dá permissão para rodar o Maven e constrói o projeto (pulando testes para ir mais rápido)
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# ==========================================
# Estágio 2: Execução (Run)
# ==========================================
FROM eclipse-temurin:26-jdk
WORKDIR /app

# Copia o arquivo .jar que foi gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que a API vai usar
EXPOSE 8080

# Liga o motor do Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]