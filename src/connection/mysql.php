<?php

    class MySQLConnection{

        private $host;
        private $user;
        private $password;
        private $database;

        public function __construct()
        {
            $this->host = $_ENV["DB_HOST"];
            $this->user = $_ENV['DB_USERNAME'];
            $this->password = $_ENV["DB_PASSWORD"];
            $this->database = $_ENV['DB_DATABASE'];
        }

        public function getConnection(){
            //echo "connecting with MySQL\n";
            $HostDB = "mysql:host=".$this->host.";dbname=".$this->database;
            $line = 0;
            try {
                $conn = new PDO($HostDB,$this->user,$this->password);
                $line = 1;
                $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $line = 2;
                //echo $HostDB."\n";
                return $conn;
            } catch (PDOException $th) {
                //throw $th;
                die($HostDB."\nError in line ".$line.": ".$th->getMessage());
            }
        }

    }
?>