package com.example.dashboard.config; // 본인의 실제 패키지 경로에 맞게 수정하세요

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Vercel 프론트엔드 주소 허용
                .allowedOrigins("https://dashboard-eunjinshins-projects.vercel.app") 
                // 허용할 HTTP 메서드
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 모든 헤더 허용
                .allowedHeaders("*")
                // 쿠키/인증 정보 포함 허용
                .allowCredentials(true)
                // 브라우저 캐싱 시간 (1시간)
                .maxAge(3600);
    }
}
