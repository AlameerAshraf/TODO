var db = openDatabase("COTA", '1.0', "My WebSQL Database", 8 * 1024 * 1024);


var select = function (User_Name) {
    return new Promise(function (resolve, reject) {
        db.transaction(function (tx) {
            tx.executeSql("SELECT User_Password FROM Users WHERE User_Name = ? ", [User_Name], function (tx, results) {
                if (results.rows.length > 0) {
                    var Pw = results.rows.item(0).User_Password;
                    resolve(Pw);
                }
                else{
                    reject("Error");
                }
            });
        });
    })
}

$("[name='Login']").click(function(){
    var UserName = $("[name='UN']").val();
    var Password = $("[name='PAS']").val();
    select(UserName).then(function(result){
        if (result == Password ){
            $(".login-state").hide();            
            $(".hide-it").show();
        }
        else{
            ShowError();
        }
    },function(err){
        ShowError();
    })
});



function ShowError (){
    $(".popup").dialog({
        resizable : false ,
        height : 250 , 
        show : "fade",
        modal: false,
    })
}


function Close(){
    $(".popup").hide(); 
    $(".ui-dialog-titlebar-close").hide();
}

