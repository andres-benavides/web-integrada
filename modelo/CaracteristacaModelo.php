<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CaracteristacaModelo
 *
 * @author AndresV
 */
class CaracteristacaModelo {

  //put your code here
  private $id_tipo;
  private $nombre;

  function __construct($id_tipo="", $nombre="") {
    $this->id_tipo = $id_tipo;
    $this->nombre = $nombre;
    $this->db = Conexion::conexionDb();
  }

  function getId_tipo() {
    return $this->id_tipo;
  }

  function getNombre() {
    return $this->nombre;
  }

  function setId_tipo($id_tipo) {
    $this->id_tipo = $id_tipo;
  }

  function setNombre($string) {
    $this->nombre = $string;
  }

  public function guardarCaracteristica() {
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
      $sql = $this->db->prepare("INSERT INTO caracteristica VALUES ($camposOk)");
      $sql->execute($insert);
      return true;
    } catch (PDOException $e) {
      return "ERROR: " . $e->getMessage();
    }
  }

  public function consultaCarac() {
    try {
      $sql = $this->db->prepare("SELECT id,nombre FROM caracteristica");
      $sql->execute();
      $resultado = Array();
      while ($respuesta = $sql->fetch(PDO::FETCH_ASSOC)) {
        array_push($resultado, $respuesta);
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
