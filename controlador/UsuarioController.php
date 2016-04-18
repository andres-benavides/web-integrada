<?php

include_once './modelo/UsuarioModelo.php';


//DECLARO LAS VARIABLES QUE VIENEN POR POST
switch ($datos['action']) {
  case "guardarUser":
    //VARIABLES DEL FORMULARIO PARA CREAR EL OBJETO
    $nombre = $datos['nombre'];
    $paswword = $datos['password'];
    $email = $datos['email'];
    //INSTANCIO EL OBJETO CON LAS VARIABLES QUE YA RECIBI DEL FORMULARIO
    $nuevoUser = new Usuario($nombre, $paswword, $email);
    //LLAMO E IMPRIMO LA RESPUESTA DEL METODO QUE HACE EL INSERT EN LA BASE DE DATOS
    echo $nuevoUser->guardarUsuario();
    break;
  case "login":
    $nuevoUser = new Usuario();
    $respuesta = $nuevoUser->logIn($datos);
    if($respuesta!=false){
      $_SESSION['idUser'] =$respuesta['id'];
      $_SESSION['nombre'] =$respuesta['nombre'];
      $_SESSION['email']  =$respuesta['email'];
      echo true;
    }else{
      echo "noUser";
    }
    
    break;
  default:
    break;
}


