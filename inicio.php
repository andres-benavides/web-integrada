<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
$data = json_decode(file_get_contents('php://input'), true);
$datos = $data['datos'];
if (isset($datos['action'])) {
  include './db/Conexion.php';
  switch ($datos['action']){
    case'guardarUser';
    case"login";
      include_once './controlador/UsuarioController.php';
      break;
    case'guardar':
      include_once './controlador/guardaPersonaController.php';
      break;
    case 'consultar':
      include_once './controlador/PersonaController.php';
      break;
  }
} else {
  include_once './controlador/carrosController.php';
}