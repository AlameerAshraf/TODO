$(document).ready(function () {


var db = openDatabase("COTA", '1.0', "My WebSQL Database", 8 * 1024 * 1024);

var create = function () {
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Users (id integer primary key, User_Name text, User_Password integer )");
    });
}

var createTasks = function () {
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Tasks (id integer primary key, TaskTitle text, TaskDetails text, State text, User_Name text )");
    });
}

var insert = function (User_Name, User_Password) {
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO Users (User_Name, User_Password) VALUES (?,?)", [User_Name, User_Password]);
    });
}
var insertTasks = function (TaskTitle, TaskDetails, State, User_Name) {
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO Tasks (TaskTitle,TaskDetails,State,User_Name) VALUES (?,?,?,?)", [TaskTitle, TaskDetails, State, User_Name]);
    });
}

var Drop = function (name) {
    db.transaction(function (tx) {
        tx.executeSql("DROP TABLE " + name, []);
    })
}


var ViewAppend = function (TaskTitle, TaskDetails, State) {
    db.transaction(function (tx) {
        tx.executeSql("SELECT id FROM Tasks WHERE TaskTitle = ? ", [TaskTitle], function (tx, results) {
            if (results.rows.length > 0) {
                var taskaia = "<div id='"+results.rows.item(0).id +"' name='" + State+ "' class='draggablediv' role='alert'>"
                    + "<a name='deleter' class='Remove-btn'><span class='fa fa-cog'></span></a>"
                    + "<label name='Clieck' class='Label-Title'>" + TaskTitle + "</label>"
                    + "<P name='Clieck1'>" + TaskDetails+ "</P> <br>"
                    + "<a id='Details'> Details.. </a> <br>"
                    + "<input class='form-control col-lg-1' id='Run-time-title' /><br>"
                    + "<input class='form-control col-lg-1' id='Run-time-data' /><br>"
                    + "<button id='Update' type='button' class='btn btn-primary btn-xs'>Update</button>"
                    + "<button name='ca' id='Cancel' type='button' class='btn btn-primary btn-xs'>Cancel</button>"
                    + "</div>";

                if (State == 1) {
                    $(".comp").append(taskaia);
                    $(".draggablediv").draggable();
                }
                else if (State == 0) {
                    $(".ncomp").append(taskaia);
                    $(".draggablediv").draggable();
                }
                $("[name='0']").addClass("alert alert-warning").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');
                $("[name='1']").addClass("alert alert-info").effect("shake", { direction: "up", times: 2, distance: 5 }, 'fast');
            }
        })
    })
}






Drop("Users");

create();
createTasks();


insert("Alameer", "123456");
insert("Mazen", "4440007");
insert("Arsany", "22584");
insert("A", "0");
insert("Amr", "010");

$("#InsertIt").click(function () {
    var Name = sessionStorage.getItem('UserName');
    var Title = $("#Title").val();
    var Data = $("#Data").val();
    var State = $('input[name=state]:checked', '#Check').val()
    if (Title.length == 0 || Data.length == 0) {
        alert("Fiels Can't be Empty");
    }
    else {
        //onsole.log(State);
        insertTasks(Title, Data, State, Name);
        $(".popup-main").hide();
        $(".ui-dialog-titlebar-close").hide();
        ViewAppend(Title, Data, State);
    }



})

})


