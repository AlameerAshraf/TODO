var Title;
var Data;
$(document).ready(function () {

    $(".draggablediv").draggable({
        cursor: "crosshair",
        revert: "invalid",
        cancel: false
    });

    $(".comp").droppable({
        accept: ".draggablediv",
        drop: function (event, ui) {
            var droppeddiv = ui.draggable;
            var destdev = $(this);
            $(droppeddiv).detach().css({ top: 0, left: 0 }).appendTo(destdev);
            $(droppeddiv).effect("shake", { direction: "up", times: 2, distance: 10 }, 'fast');
            $(droppeddiv).removeClass('alert alert-warning');
            $(droppeddiv).addClass("alert alert-info");
            var IdDrppedItem = $(droppeddiv).attr('id'); 
            update('1',IdDrppedItem);
        },
        over: function (event, elem) {
            console.log("Over");
        },
        out: function (event, elem) {
            console.log("Out");
        },
    })

    $(".ncomp").droppable({
        accept: ".draggablediv",
        drop: function (event, ui) {
            var droppeddiv = ui.draggable;
            var destdev = $(this);
            $(droppeddiv).detach().css({ top: 0, left: 0 }).appendTo(destdev);
            $(droppeddiv).effect("shake", { direction: "up", times: 2, distance: 10 }, 'fast');
            $(droppeddiv).removeClass('alert alert-info');
            $(droppeddiv).addClass("alert alert-warning");
            var IdDrppedItem = $(droppeddiv).attr('id'); 
            update('0',IdDrppedItem);
        },
        over: function (event, elem) {
            console.log("Over");
        },
        out: function (event, elem) {
            console.log("Out");
        },
    })

    $(".comp").sortable();
    $(".ncomp").sortable();

    var update = function (State, id) {
        db.transaction(function (tx) {
            tx.executeSql("UPDATE Tasks SET State = ?  WHERE id = ? ;", [State, id]);
        })
    }

    $(document).delegate("#AddTask", "click", function () {
        AddTaskPopUp();
    });

    function AddTaskPopUp() {
        $(".popup-main").dialog({
            resizable: false,
            height: 380,
            width: 500,
            show: "fade",
            modal: false,
        })
    }
})

