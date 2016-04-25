<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Persona
 *
 * @author benavidesa
 */
class Usuario {

  private $nombre;
  private $password;
  private $email;
  private $db;

  function __construct($nombre = "", $password = "", $email = "") {
    $this->nombre = $nombre;
    $this->password = $password;
    $this->email = $email;
    $this->db = Conexion::conexionDb("pgsql", "usuarios", "postgres", "root");
  }

  function getNombre() {
    return $this->nombre;
  }

  function getPassword() {
    return $this->password;
  }

  function getEmail() {
    return $this->email;
  }

  function setNombre($nombre) {
    $this->nombre = $nombre;
  }

  function setPassword($password) {
    $this->password = $password;
  }

  function setEmail($email) {
    $this->email = $email;
  }

  public function guardarUsuario() {
    try {
      $insert = Array();
      $campos = "";
      foreach ($this as $columna => $valor) {
        if ($columna != "db") {
          $insert[$columna] = $valor;
          $campos .=":$columna,";
        }
      }
      $camposOk = substr($campos, 0, -1);
      $sql = $this->db->prepare("INSERT INTO usuario(nombre,password,email) VALUES ($camposOk)");
      $hola=$sql->execute($insert);
      if($hola!=FALSE){
        return true;
      }else{
        return false;
      }
      
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

  public function logIn($datos) {
    try {
      unset($datos['action']);
      $sql = $this->db->prepare("SELECT * FROM usuario WHERE email=:email AND password=:password");
      $sql->execute($datos);
      $respuesta = $sql->fetch(PDO::FETCH_ASSOC);
      unset($respuesta['password']);
      $registro=$sql->rowCount();
      if ($registro>=1) {
        return $respuesta;
      } else {
        return false;
      }
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

}
