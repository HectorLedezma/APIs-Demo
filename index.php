<?php
    require_once __DIR__.'/vendor/autoload.php';

    use Dotenv\Dotenv;

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    //echo "index.php\n";
    $end_ponint = $_SERVER['DOCUMENT_ROOT'] ."\\src\\routes". str_replace("/","\\",$_SERVER['REQUEST_URI']);
    require_once $end_ponint;
    
?>