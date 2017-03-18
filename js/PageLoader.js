$(document).ready(function () {


    var Details = function (Id) {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM Tasks WHERE id = ? ", [Id], function (tx, results) {
                if (results.rows.length > 0) {
                    var State = results.rows.item(0).State;
                    var taskaia = "<div id='" + results.rows.item(0).id + "' name='" + results.rows.item(0).State+ "' class='draggablediv' role='alert'>"
                        + "<a class='Remove-btn'><span class='fa fa-cog'></span></a>"
                        + "<label name='Clieck' class='Label-Title'>" + results.rows.item(0).TaskTitle + "</label>"
                        + "<P name='Clieck1'>" + results.rows.item(0).TaskDetails + "</P> <br>"
                        + "<input class='form-control col-lg-1' id='Run-time-title' /><br>"
                        + "<input class='form-control col-lg-1' id='Run-time-data' /><br>"
                        + "<button id='Update' type='button' class='btn btn-primary btn-xs'>Update</button>"
                        + "<button name='ca' id='Cancel' type='button' class='btn btn-primary btn-xs'>Cancel</button>"
                        + "</div>";

                        
                if (State == 1) {
                    $(".Data-Details").append(taskaia);
                    $(".draggablediv").draggable({
                         cursor: "crosshair",
                         revert: "invalid",
                    });                    
                }
                else if (State == 0) {
                    $(".Data-Details").append(taskaia);
                    $(".draggablediv").draggable({
                         cursor: "crosshair",
                         revert: "invalid",
                    });
                }
                $("[name='0']").addClass("alert alert-warning").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');
                $("[name='1']").addClass("alert alert-info").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');
            
                }
            })
        })
    }

    $(document).delegate("#Details", "click", function () {
        var id = $(this).parent().attr('id');
        $(".hide-it").hide();
        $(".Data-Details").show();
        Details(id);
    })


    
})