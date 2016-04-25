$(document).ready(function () {
  //traer Carros
  $.ajax({
    method: 'POST',
    url: 'controlador/adminController.php',
    dataType: 'json',
    data: {tabla: "auto", action: "consulta"}
  }).success(function (data) {
    $.each(data, function (key, value) {
      $(".selecCarro").append("<option value='" + value.id + "'>" + value.marca + "</option>");
    });
  });

  //CARROS
  $(".divCal").hide();
  $(".selecCarro").change(function () {
    //$(".divCal").hide();
    var id = $(this).val();
    var numCar = $(this).attr('data-carro');
    $("#desc" + numCar).empty();
    $("#divClas" + numCar).hide();
    if (id != "") {
      //$("#divClas" + numCar).show();
//      $("#cali" + numCar).val(1);
//      var valCali = $("#cali" + numCar).val();
//      $("#numCalif"+numCar).text(valCali);
      $.ajax({
        method: 'POST',
        url: 'controlador/adminController.php',
        dataType: 'json',
        data: {tabla: "auto", action: "datosAutos", id: id}
      }).success(function (data) {
        var foto = data['foto'];
        delete data['foto'];
        $("#desc" + numCar).attr("data-ver", numCar);
        $.each(data, function (key, value) {
          $("#desc" + numCar).append("<li class='list-group-item' style='background:#58ACFA'><strong>" + key + "</strong></li>");
          $.each(value, function (key2, calTip) {
            $("#desc" + numCar).append("<li class='list-group-item'><strong>" + calTip[0] + ":</strong> " + calTip[1] + "</li>");
          });
        });
      });
    }
  });

  $(".calif").change(function () {
    var calNum = $(this).attr("data-range");
    $("#numCalif" + calNum).text($(this).val());
  });
  //ACTIVAR CALIFICACION/////////////////////////////////////
  var max;
  $("#calificar").click(function () {
    max = 0;
    $(".calif").empty();
    $.each($(".list-group-flush"), function (key, val) {
      var ver = $(val).attr("data-ver");
      if (ver != "") {
        max++;
        $(".calif").append("<option value='" + max + "'>" + max + "</option>");
        $("#divClas" + ver).show();
      }
    });
    if (max > 0) {
      $("#grdCali").show();
    }
  });
  //GUARDAR LA CALIFICACION DE LOS CARROS///////////////////////////////////////////////////
  $("#grdCali").click(function () {
    var califA = new Array();
    var guardar = false;
    $.each($(".selecCarro"), function (key, val) {
      var idCarro = $(val).val();
      var numCarro = $(val).attr("data-carro");
      if (idCarro != "") {
        var calif = $("#cali" + numCarro).val();
        if (calif != "") {
          if (califA.indexOf(calif) != -1) {
            console.log("YA ESTA");
            guardar = false;
          } else {
            guardar = true;
            console.log("NO ESTA");
          }
          califA.push(calif);
        }
      }
    });
    if (guardar) {
       var guardoCal =0;
      $.each($(".selecCarro"), function (key, val) {
        var idCarro = $(val).val();
        var numCarro = $(val).attr("data-carro");
        if (idCarro != "") {
          var calif = $("#cali" + numCarro).val();
          $.ajax({
            method: 'POST',
            url: 'controlador/adminController.php',
            dataType: 'json',
            async: false,
            data: {tabla: "calificacion", action: "guardar",id_auto:idCarro,calificacion:calif}
          }).success(function (data) {
            guardoCal++;
          });
        }
      });
      if(guardoCal==max){
        alert("Calificaciones Guardadas");
      }
    } else {
      alert("Los autos deben tener calificaciones distintas");
    }
  });

});

