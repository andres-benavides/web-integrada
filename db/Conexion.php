<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of db
 *
 * @author benavidesa
 */
class Conexion {

  public static function conexionDb($prefijo="mysql",$dbname="carros", $user="root", $password="c4mp0sKA") {
    $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',);
    $dsn="$prefijo:host=localhost;dbname=$dbname";
    $conexion = new PDO( $dsn,  $user, $password,$opciones);
    return $conexion;
  }


}
