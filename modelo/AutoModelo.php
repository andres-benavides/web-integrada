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
class AutoModelo {

  private $foto;
  private $marca;
  private $modelo;
  private $db;

  function __construct($foto="", $marca="", $modelo="") {
    $this->foto = $foto;
    $this->marca = $marca;
    $this->modelo = $modelo;
    $this->db = Conexion::conexionDb();
  }
  function getFoto() {
    return $this->foto;
  }

  function getMarca() {
    return $this->marca;
  }

  function getModelo() {
    return $this->modelo;
  }

  function setFoto($foto) {
    $this->foto = $foto;
  }

  function setMarca($marca) {
    $this->marca = $marca;
  }

  function setModelo($modelo) {
    $this->modelo = $modelo;
  }

  
  public function guardarCarro() {
    try {
      $insert = Array();
      $campos = "NULL,";
      foreach ($this as $columna => $valor) {
        if ($columna != "db") {
          $insert[$columna] = $valor;
          $campos .=":$columna,";
        }
      }
      $camposOk = substr($campos, 0, -1);
      $sql = $this->db->prepare("INSERT INTO auto VALUES ($camposOk)");
      $sql->execute($insert);
      return true;
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }
  public function consultaAuto() {
    try {
      $sql = $this->db->prepare("SELECT id,marca FROM auto");
      $sql->execute();
      $resultado = Array();
      while($respuesta = $sql->fetch(PDO::FETCH_ASSOC)){
        array_push($resultado,$respuesta);
      }
      $registro = $sql->rowCount();
      if ($registro >= 1) {
        return $resultado;
      } else {
        return false;
      }
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

   public function datosAuto($id) {
    try {
      $sql = $this->db->prepare("call datos_auto(:idAuto)");
      $sql->execute(Array('idAuto'=>$id));
      $resultado = Array();
      while($respuesta = $sql->fetch(PDO::FETCH_ASSOC)){
        $resultado['foto']=$respuesta['foto'];
        $resultado[$respuesta['descripcion']][]=Array($respuesta['nombre'],$respuesta['descAuto']);
        //array_push($resultado,$respuesta);
      }
      $registro = $sql->rowCount();
      if ($registro >= 1) {
        return $resultado;
      } else {
        return false;
      }
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }
}
