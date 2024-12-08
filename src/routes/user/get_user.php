<?php
    require_once($_SERVER['DOCUMENT_ROOT'] ."\\src".'\\controllers\\User.controller.php');
    require_once($_SERVER['DOCUMENT_ROOT'] ."\\src".'\\connection\\mysql.php');

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        UserController::getAllUser(new MySQLConnection());
    }else{
        header('HTTP/1.1 404 Pagina no encontrada');
        echo 'Error 404 - Pagina no encontrada';
    }
?>