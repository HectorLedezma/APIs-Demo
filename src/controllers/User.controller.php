<?php
    
    class UserController{
        
        public static function getAllUser(MySQLConnection $conn){
            $conn_OK = $conn->getConnection();
            $query = "SELECT * FROM `user`";
            $prexe = $conn_OK->prepare($query);
            try {
                if($prexe->execute()){
                    $resultados = $prexe->fetchAll(PDO::FETCH_ASSOC);
                    header('Content-Type: application/json; charset=UTF-8');
                    header('HTTP/1.1 200 Consulta ejecutada');
                    echo json_encode($resultados);
                    
                }else{
                    header('HTTP/1.1 500 Internal Server Error');
                    echo json_encode(["error" => "Error al ejecutar la consulta."]);
                }
            } catch (\Throwable $th) {
                header('HTTP/1.1 500 Internal Server Error');
                    echo json_encode(["error" => "Error interno del servidor."]);
            }
        }

        public static function getOneUser(MySQLConnection $conn, $body){
            $conn_OK = $conn->getConnection();
            $query = "SELECT * FROM `user` 
                        WHERE `nick_name` = '".$body['nick_name']."' 
                        AND `password` = '".$body['password']."'";
            $prexe = $conn_OK->prepare($query);
            try {
                if($prexe->execute()){
                    $resultados = $prexe->fetchAll(PDO::FETCH_ASSOC);
                    header('Content-Type: application/json; charset=UTF-8');
                    header('HTTP/1.1 200 Consulta ejecutada');
                    echo json_encode($resultados);
                    
                }else{
                    header('HTTP/1.1 500 Internal Server Error');
                    echo json_encode(["error" => "Error al ejecutar la consulta."]);
                }
            } catch (\Throwable $th) {
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(["error" => "Error interno del servidor."]);
            }
        }

    }
?>