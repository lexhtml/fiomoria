<?php

$host = 'localhost';
$usuario = 'root';
$senha = '';
$database = 'login';

$mysqli = new mysqli($host, $usuario, $senha, $database);

if($mysqli->error) {
    die("Falha ao conectar ao banco de dado: " . $mysqli->error);
}

?>