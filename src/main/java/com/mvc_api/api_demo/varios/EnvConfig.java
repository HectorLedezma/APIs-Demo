package com.mvc_api.api_demo.controller.varios;
import io.github.cdimascio.dotenv.Dotenv;

public class EnvConfig {
    private static final Dotenv dotenv = Dotenv.load(); // Carga el archivo .env

    public static String get(String key) {
        return dotenv.get(key);
    }
}
