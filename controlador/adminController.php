<?php
include '../db/Conexion.php';
include_once '../modelo/AutoModelo.php';
include_once '../modelo/TipoCaracteristicaModelo.php';
include_once '../modelo/CaracteristacaModelo.php';
include_once '../modelo/CaracteristicaAutoModelo.php';

$data = json_decode(file_get_contents('php://input'), true);
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

  default:
    break;
}

