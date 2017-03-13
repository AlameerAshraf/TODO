$(document).ready(function(){

    $("#LoginTarget").click(function(){
        console.log("as");
        ShowError();
    })


    


















})

function ShowError (){
    $("#DialogLogin").dialog({
        resizable : false ,
        height : 200 , 
        modal: true,
        buttons : {
            'OK':function(){
                $(this).dialog("close");
                console.log("true");
            }
        }
    });
};