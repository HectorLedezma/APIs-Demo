package com.mvc_api.api_demo.controller;

import com.mvc_api.api_demo.connection.MySQL;
import com.mvc_api.api_demo.model.User;
import com.mvc_api.api_demo.varios.Encryptor;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    
//Create
    @PostMapping("/new-user")
    public ResponseEntity<String> InsertUser(@RequestBody User user){
        if(user.getNombre() != null && user.getPass() != null){
            MySQL msql = new MySQL();
            Connection conn = msql.connect();
            Encryptor crypt = new Encryptor();
            String sql = "INSERT INTO `User`(`pass`, `nombre`) VALUES ('"+
                        crypt.encryptSHA256(user.getPass()).toUpperCase()+
                        "','"+user.getNombre()+
                    "')";
            try{
                PreparedStatement pstm = conn.prepareStatement(sql);
                pstm.execute();
                return ResponseEntity.ok("Usuario ingresado");
            }catch(SQLException e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Datos de usuario no validos");
        }
    }
    
//Read
    @GetMapping("/all-user")
    public ResponseEntity<Object> GetAllUsers(){
        MySQL msql = new MySQL();
        
        // Variables para la conexión
        Connection conn = null;
        Statement stm = null;
        ResultSet userSet = null;
        try{
            conn = msql.connect();
            stm = conn.createStatement();
            String sql = "SELECT * FROM `User`";
            userSet = stm.executeQuery(sql);
            
            ArrayList<User> users = new ArrayList<User>();
            
            while(userSet.next()){
                System.out.println("Dentro del ResultSet");
                int id = userSet.getInt("id");
                String pass = userSet.getString("pass");
                String nombre = userSet.getString("nombre");
                
                users.add(new User(id,pass,nombre));
            }
            System.out.println("Consulta realizada con exito");
            return ResponseEntity.ok(users);
            //
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }finally{
            try {
                if (userSet != null) userSet.close();
                if (stm != null) stm.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
    }
    
    @GetMapping("/one-user")
    public ResponseEntity<Object> GetOneUsers(@RequestHeader int id){
        MySQL msql = new MySQL();
        
        // Variables para la conexión
        Connection conn = null;
        Statement stm = null;
        ResultSet userSet = null;
        User TheUser = null;
        try{
            conn = msql.connect();
            stm = conn.createStatement();
            String sql = "SELECT * FROM `User` WHERE `User`.`id` = "+id;
            userSet = stm.executeQuery(sql);
            
            int userid;
            String pass;
            String nombre;
            
            while(userSet.next()){
                System.out.println("Dentro del ResultSet");
                userid = userSet.getInt("id");
                pass = userSet.getString("pass");
                nombre = userSet.getString("nombre");
                
                TheUser = new User(userid,pass,nombre);
            }
            System.out.println("Consulta realizada con exito");
            return ResponseEntity.ok(TheUser);
            //
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }finally{
            try {
                if (userSet != null) userSet.close();
                if (stm != null) stm.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
    }

//Update
    
//Delete
}
