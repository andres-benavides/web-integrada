<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ModeloTipoCaracteristica
 *
 * @author AndresV
 */
class TipoCaracteristicaModelo {
  private $descripcion;
  private $db;
  
  function __construct($descripcion="") {
    $this->descripcion = $descripcion;
    $this->db = Conexion::conexionDb();
  }
  
  function getDescripcion() {
    return $this->descripcion;
  }

  function setDescripcion($descripcion) {
    $this->descripcion = $descripcion;
  }

  public function guardarTipoCara() {
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
      $sql = $this->db->prepare("INSERT INTO tipo_caracteristica VALUES ($camposOk)");
      $sql->execute($insert);
      return true;
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }
  public function consultaTipoCarac() {
    try {
      $sql = $this->db->prepare("SELECT * FROM tipo_caracteristica");
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

}
