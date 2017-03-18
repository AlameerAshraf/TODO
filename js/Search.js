$(document).ready(function () {


    var ViewAppend = function (TaskTitle) {
        db.transaction(function (tx) {
            var Name = sessionStorage.getItem('UserName');
            tx.executeSql("SELECT * FROM Tasks WHERE User_Name = ? AND  TaskTitle LIKE '%' || ? || '%'", [Name,TaskTitle], function (tx, results) {
                if (results.rows.length > 0) {
                    var State = results.rows.item(0).State;
                    console.log(results.rows);
                    var taskaia = "<div id='" + results.rows.item(0).id + "' name='" + results.rows.item(0).State + "' class='alert alert-success' role='alert'>"
                        + "<a class='Remove-btn'><span class='fa fa-cog'></span></a>"
                        + "<label  class='Label-Title'>" + results.rows.item(0).TaskTitle + "</label>"
                        + "<P>" + results.rows.item(0).TaskDetails + "</P> <br>"
                        + "<input class='form-control col-lg-1' id='Run-time-title' /><br>"
                        + "<input class='form-control col-lg-1' id='Run-time-data' /><br>"
                        + "</div>";            

                        $(".Data-Details").append(taskaia);
                }
            })
        })
    }


    $("#myTextBox").bind('input propertychange', function () {
        $(".Data-Details").children().hide();
        ViewAppend($(this).val());
    });

    $("#myTextBox").focus(function () {
        $(".hide-it").hide();
        $(".Data-Details").show();
        $(".Data-Details").children().hide();
        
    })

})