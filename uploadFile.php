<?php

//function uploadFile() {
$ruta = array();
$data = explode('.', $_FILES["archivo"]["name"]);
$file = base64_encode($_FILES["archivo"]["name"] . date('YmdH:i:s')) . ".{$data[count($data) - 1]}";
$destino = "assets/uploadFile/$file";
if (move_uploaded_file($_FILES["archivo"]['tmp_name'], $destino)) {
  $ruta['codigo']=$destino;
  echo json_encode($ruta);
} else {
  echo "Paila";
}

//}
//
//function uploadFile() {
//  if (!file_exists(URL_FILES_TMP)) {
//    @mkdir(URL_FILES_TMP, 0777, true);
//  }
//  $data = explode('.', $_FILES["archivo"]["name"]);
//  $file = base64_encode($_FILES["archivo"]["name"] . date('YmdH:i:s')) . ".{$data[count($data) - 1]}";
//  $destino = URL_FILES_TMP . $file;
//  if (move_uploaded_file($_FILES["archivo"]['tmp_name'], $destino)) {
//    $codigoSesion = Utility::lotery(25);
//    $this->_sesion->__set($codigoSesion, $file);
//    $this->_view->printJSON(array(
//        "st" => $_FILES["archivo"]["error"],
//        "codigo" => base64_encode($codigoSesion)
//    ));
//  } else {
//    $this->_view->printJSON(array("st" => false));
//  }
//}
