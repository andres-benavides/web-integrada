<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CalificacionModelo
 *
 * @author AndresV
 */
class CalificacionModelo {
  private $id_auto;
  private $id_usuario;
  private $calificacion;
  private $fecha;
  
  function __construct($id_auto, $id_usuario, $calificacion, $fecha) {
    $this->id_auto = $id_auto;
    $this->id_usuario = $id_usuario;
    $this->calificacion = $calificacion;
    $this->fecha = $fecha;
    $this->db = Conexion::conexionDb();
  }
  public function guardarCalif() {
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
      $sql = $this->db->prepare("INSERT INTO calificacion VALUES ($camposOk)");
      $sql->execute($insert);
      return true;
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

}
