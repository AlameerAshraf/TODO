var Id;
$(document).ready(function () {

    $("[name='Login']").click(function () {
        var UserName = $("[name='UN']").val();
        sessionStorage.setItem("UserName", UserName);

        var selectTasks = function (UserName) {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM Tasks WHERE User_Name = ? ", [UserName], function (tx, results) {
                    if (results.rows.length > 0) {
                        var results = results.rows;
                        for (i = 0; i < results.length; i++) {
                            var taskaia = "<div id='" + results[i].id + "' name='" + results[i].State + "' class='draggablediv' role='alert'>"
                                + "<a name='deleter' class='Remove-btn'><span class='fa fa-cog'></span></a>"
                                + "<label name='Clieck' class='Label-Title'>" + results[i].TaskTitle + "</label>"
                                + "<P name='Clieck1'>" + results[i].TaskDetails + "</P> <br>"
                                + "<a id='Details'> Details.. </a> <br>"
                                + "<input class='form-control col-lg-1' id='Run-time-title' /><br>"
                                + "<input class='form-control col-lg-1' id='Run-time-data' /><br>"
                                + "<button id='Update' type='button' class='btn btn-primary btn-xs'>Update</button>"
                                + "<button name='ca' id='Cancel' type='button' class='btn btn-primary btn-xs'>Cancel</button>"
                                + "</div>";
                            if (results[i].State == 1) {
                                $(".comp").append(taskaia);
                                $(".draggablediv").draggable();
                            }
                            else if (results[i].State == 0) {
                                $(".ncomp").append(taskaia);
                                $(".draggablediv").draggable();
                            }
                            $("[name='0']").addClass("alert alert-warning").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');
                            $("[name='1']").addClass("alert alert-info").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');

                        }
                    }
                });
            });
        }

        var update = function (TaskTitle, TaskDetails, id) {
            db.transaction(function (tx) {
                tx.executeSql("UPDATE Tasks SET TaskTitle = ? ,TaskDetails = ?  WHERE id = ? ;", [TaskTitle, TaskDetails, id]);
            })
        }

        selectTasks(UserName);

        $(document).delegate("[name='Clieck'],[name='Clieck1']", "click", function () {
            var ClickedParent = $(this).parent();
            var Title = ClickedParent.find('label').text();
            var Data = ClickedParent.find('P').text();
            ClickedParent.find('label').hide();
            ClickedParent.find('P').hide();
            ClickedParent.find('br').show();
            ClickedParent.find('#Run-time-title').show().val(Title);
            ClickedParent.find('#Run-time-data').show().val(Data);
            ClickedParent.find('#Details').hide();
            ClickedParent.find('#Update,#Cancel').show();
        });





        $(document).delegate("[name='ca']", "click", function () {
            var ClickedParent = $(this).parent();
            ClickedParent.find('label').show();
            ClickedParent.find('P').show();
            ClickedParent.find('#Details').show();
            ClickedParent.find('#Run-time-title').hide();
            ClickedParent.find('#Run-time-data').hide();
            ClickedParent.find('#Update,#Cancel').hide();
            ClickedParent.find('br').hide();
        })

        $(document).delegate("#Update", "click", function () {
            var ClickedParent = $(this).parent();
            var TaskId = ClickedParent.attr("id");
            var NewTitle = ClickedParent.find('#Run-time-title').val();
            var NewDetails = ClickedParent.find('#Run-time-data').val();
            ClickedParent.find('label').show();
            ClickedParent.find('P').show();
            ClickedParent.find('#Details').show();
            ClickedParent.find('#Run-time-title').hide();
            ClickedParent.find('#Run-time-data').hide();
            ClickedParent.find('#Update,#Cancel').hide();
            ClickedParent.find('br').hide();
            update(NewTitle, NewDetails, TaskId);
            ClickedParent.find('label').text(NewTitle);
            ClickedParent.find('P').text(NewDetails);
        })


        function ShowPermission() {
            $(".IsItDeletable").dialog({
                resizable: false,
                height: 250,
                show: "fade",
                modal: false,
            })
        }

        var Delete = function (ID) {
            db.transaction(function (tx) {
                tx.executeSql("Delete FROM Tasks where id==" + ID);
            })
        }


        $(document).delegate("[name='deleter']", "click", function () {
            Id = $(this).parent().attr('id');
            ShowPermission();
        })

        $(document).delegate("#Yesd", "click", function () {

            $(".IsItDeletable").hide();
            $(".ui-icon ui-icon-closethick").remove();
            Delete(Id);
            $(document).find("#" + Id).remove();
        })

        $(document).delegate("#Nod", "click", function () {
            $(".IsItDeletable").hide();
            $(".ui-icon ui-icon-closethick").remove();
        })


        $(document).delegate("#backer", "click", function () {
            $(".Data-Details").hide();            
            $(".hide-it").show();
           //selectTasks(UserName);
        })


    })

})