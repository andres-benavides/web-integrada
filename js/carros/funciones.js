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
      $("#divClas" + numCar).show();
      var valCali = $("#cali" + numCar).val();
      $("#numCalif"+numCar).text(valCali);
      $.ajax({
        method: 'POST',
        url: 'controlador/adminController.php',
        dataType: 'json',
        data: {tabla: "auto", action: "datosAutos", id: id}
      }).success(function (data) {
        var foto = data['foto'];
        delete data['foto'];
        $.each(data, function (key, value) {
          $("#desc" + numCar).append("<li class='list-group-item' style='background:#58ACFA'><strong>" + key + "</strong></li>");
          $.each(value, function (key2, calTip) {
            $("#desc" + numCar).append("<li class='list-group-item'><strong>" + calTip[0] + ":</strong> " + calTip[1] + "</li>");
          });
        });
      });
    }
    
    //BUSCAR EL VALOR MAXIMO PARA CALIFICAR max=0;
     var max=0;
    $.each($(".divCal"),function(key,val){
      if($(val).is(":visible")){
        max++;
      }
    });
    $(".calif").attr("max",max);
    console.log(max);
  });
});

