<?php
    require_once($_SERVER['DOCUMENT_ROOT'] ."\\src".'\\controllers\\User.controller.php');
    require_once($_SERVER['DOCUMENT_ROOT'] ."\\src".'\\connection\\mysql.php');
    $body = file_get_contents("php://input");
    $line = 0;
    try {
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $line = 1;
            UserController::getOneUser(new MySQLConnection(),json_decode($body, true));
            $line = 2;
        }else{
            header('HTTP/1.1 404 Error');
            echo 'Error 404 - Solisitud incorrecta';
        }
    } catch (\Throwable $th) {
        header('HTTP/1.1 404 Error de conexión');
        echo $body;
        echo "\nError 404 - Error de conexión en linea ".$line."\n".$th;
    }
    
?>