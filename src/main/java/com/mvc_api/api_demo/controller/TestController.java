package com.mvc_api.api_demo.controller;

import com.mvc_api.api_demo.controller.varios.EnvConfig;
import com.mvc_api.api_demo.model.User;
import com.mvc_api.api_demo.connection.MySQL;
import java.sql.Connection;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    
    @GetMapping("/test")
    public String pruebaGET(){
        return "Servidor funcionando correctamente para solicitudes GET";
    }
    
    @PostMapping("/test")
    public String pruebaPOST(){
        return "Servidor funcionando correctamente para solicitudes POST";
    }
    
    @PutMapping("/test")
    public String pruebaPUT(){
        return "Servidor funcionando correctamente para solicitudes PUT";
    }
    
    @DeleteMapping("/test")
    public String pruebaDELETE(){
        return "Servidor funcionando correctamente para solicitudes DELETE";
    }
    
    @PatchMapping("/test")
    public String pruebaPATCH(){
        return "Servidor funcionando correctamente para solicitudes PATCH";
    }
    
    @GetMapping("/test-param")
    public User pruebaGETparam(
            @RequestBody User user
    ){
        if(user == null){
            return null;
        }else{
            return user;
        }
    }
    
    @GetMapping("/test-env")
    public String[] testEnv(){
        EnvConfig config = new EnvConfig();
        String driver = config.get("MySQL_driver");
        String host = config.get("MySQL_host");
        
        String[] result = {driver, host};
        
        return result;
    }
    
    @GetMapping("/test-sql")
    public String testConnection(){
        MySQL msql = new MySQL();
        msql.connect();
        return " Connection state: \n"+msql.getState();
    }
    
}
