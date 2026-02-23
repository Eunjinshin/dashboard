# 1. 빌드 스테이지
# Java 21 버전의 JDK를 사용합니다.
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
# 빌드 실행
RUN ./gradlew bootJar -x test

# 2. 실행 스테이지
# 실행 시에도 Java 21 버전의 JRE를 사용합니다.
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
