<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CaracteristicaAutoModelo
 *
 * @author AndresV
 */
class CaracteristicaAutoModelo {
  //put your code here
  private $id_caracteristica;
  private $id_auto;
  private $descripcion;
  
  function __construct($id_caracteristica, $id_auto, $descripcion) {
    $this->id_caracteristica = $id_caracteristica;
    $this->id_auto = $id_auto;
    $this->descripcion = $descripcion;
    $this->db = Conexion::conexionDb();
  }
  
    public function guardarCaracXAuto() {
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
      $sql = $this->db->prepare("INSERT INTO caracteristicas_auto VALUES ($camposOk)");
      $sql->execute($insert);
      return true;
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

}
