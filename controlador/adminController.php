<?php

session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once('../nusoap/lib/nusoap.php');
include '../db/Conexion.php';
include_once '../modelo/AutoModelo.php';
include_once '../modelo/TipoCaracteristicaModelo.php';
include_once '../modelo/CaracteristacaModelo.php';
include_once '../modelo/CaracteristicaAutoModelo.php';
include_once '../modelo/CalificacionModelo.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data == null) {
  $varPost = filter_input_array(INPUT_POST);
  $data['datos'] = $varPost;
}

$datos = $data['datos'];
switch ($datos['tabla']) {
  case "auto":
    switch ($datos['action']) {
      case "guardar":
        //VARIABLES
        $foto = $datos['foto'];
        $marca = $datos['marca'];
        $modelo = $datos['modelo'];
        $auto = new AutoModelo($foto, $marca, $modelo);
        $auto->guardarCarro();
        break;
      case "consulta":
        $auto = new AutoModelo();
        $respuesta = $auto->consultaAuto();
        echo json_encode($respuesta);
        break;
      case "datosAutos":
//        $auto = new AutoModelo();
//        $respuesta = $auto->datosAuto($varPost['id']);
//        echo json_encode($respuesta);
        $cliente = new nusoap_client('http://localhost/webService/returnArray.php?wsdl', 'WSDL');
        $cliente->http_encoding = 'utf-8';
        $cliente->defencoding = 'utf-8';
        $cliente->decode_utf8 = false;
        $resultado = $cliente->call('RetornarAutos', array('id' => $varPost['id']));
        $respuesta = $resultado['magico'];
        echo ($respuesta);
        break;
      default:

        break;
    }
    break;
  case "tipo_caracteristica":
    switch ($datos['action']) {
      case "guardar":
        //VARIABLES
        $descripcion = $datos['descripcion'];
        $auto = new TipoCaracteristicaModelo($descripcion);
        $auto->guardarTipoCara();
        break;
      case "consulta":
        $auto = new TipoCaracteristicaModelo();
        $respuesta = $auto->consultaTipoCarac();
        echo json_encode($respuesta);
        break;
      default:
        break;
    }
    break;
  case "caracteristica":
    switch ($datos['action']) {
      case "guardar":
        //VARIABLES
        $id_tipo = $datos['id_tipo'];
        $nombre = $datos['nombre'];
        $auto = new CaracteristacaModelo($id_tipo, $nombre);
        $auto->guardarCaracteristica();
        break;
      case "consulta":
        $auto = new CaracteristacaModelo();
        $respuesta = $auto->consultaCarac();
        echo json_encode($respuesta);
        break;

      default:
        break;
    }
    break;
  case "caracteristicas_auto":
    switch ($datos['action']) {
      case "guardar":
        //VARIABLES
        $id_caracteristica = $datos['id_caracteristica'];
        $id_auto = $datos['id_auto'];
        $descripcion = $datos['descripcion'];
        $auto = new CaracteristicaAutoModelo($id_caracteristica, $id_auto, $descripcion);
        $auto->guardarCaracXAuto();
        break;
      case "consulta":
        $auto = new CaracteristacaModelo();
        $respuesta = $auto->consultaCarac();
        echo json_encode($respuesta);
        break;

      default:
        break;
    }
    break;
  case "calificacion":
    switch ($datos['action']) {
      case "guardar":
        //VARIABLES
        $id_auto = $datos['id_auto'];
        $id_usuario = $_SESSION['idUser'];
        $calificacion = $datos['calificacion'];
        $fecha = date("Y-m-d H:i:s");
        echo $_SESSION['idUser'];
        $auto = new CalificacionModelo($id_auto, $id_usuario, $calificacion, $fecha);
        echo $auto->guardarCalif();
        break;

      default:

        break;
    }
    break;
  default:
    break;
}

