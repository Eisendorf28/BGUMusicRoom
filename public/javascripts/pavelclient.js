var now = moment().add(3, 'hours');
var nowISO = now.toISOString();
var laterISO = now.clone().add(3, 'days').toISOString();
var selection = [null, null];                       //array holding selected info selection[start_timestamp][end_timestamp]
console.log(selection[0] + selection[1]);
var selectValidation = function (selectInfo) {      //restricts selection for 2 hours tops
    var duration = moment.duration(selectInfo.end.diff(selectInfo.start));
    var hours = duration.asHours();
    //  debugger;
    return (hours < 3);                         //what if admin account?
}
$(document).ready(function () {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        slotDuration: '01:00:00',
        allDaySlot: false,                      //shit
        slotLabelFormat: 'HH:mm',
        slotEventOverlap: false,               //what if drums/piano are taken away?   irrelevant nw
        nowIndicator: true,
        displayEventTime: true,                //on events
        displayEventEnd: true,                 //same
        //dayPopoverFormat,                    //change later
        selectable: true,
        selectHelper: true,
        selectOverlap: false,
        selectConstraint: {
            start: nowISO,                     //no duration function
            end: laterISO
        },
        selectAllow: selectValidation,

        // eventConstraint: {                  //no duration function yet
        //     businessHours
        // },
        header: {
            center: 'agendaWeek',               //, more views 
            left: 'title',                      //the date title
            right: 'walla today prev,next'      //today, prev and next 
        },
        // buttons for switching between views no need
        views: {
            agendaWeek: {
                type: 'agenda',
                //duration: { minutes: '01:00:00' },
                buttonText: 'Week',
            }
        },
        eventClick: function (calEvent, jsEvent, view) {
            $('#eventStart').datepicker("setDate", new Date(calEvent.start));
            $('#eventEnd').datepicker("setDate", new Date(calEvent.end));
            $('#eventContent #eventTitle').val(calEvent.title);
            var id = calEvent.id;
            console.log(id);
            $("#eventContent").dialog("option", "buttons", [
                {
                    text: "Delete",
                    click: function () {
                        $.ajax({                                                           //sending deletion request to server
                            type: 'DELETE',
                            url: '/API/room_occupation/delete/' + encodeURIComponent(id), //remember that nifty trick
                            success: function () {
                                console.log(id);
                                destroyAndRender();
                            },
                            error: function(){
                                console.log(id + "error");
                                destroyAndRender();
                            }
                        });
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]);
            $("#eventContent").dialog("option", "title", "Edit Event");
            $('#eventContent').dialog('open');
        },
        editable: true,
        //eventClick: function (event, jsEvent, view) {
        //set the values and open the modal
        // $("#eventInfo").html(event);
        // $("#eventLink").attr('href', event.url);
        // $("#eventContent").dialog({ modal: true, title: event.title });
        // dayClick: function (selectInfo) {
        //     $("selectInfo").html(selectInfo);
        //     $("#eventLink").attr('href', event.url);
        //     $("#eventContent").dialog({ modal: true, title: event.title });
        // },
        select: function (start, end, allDay) {
            $('#eventStart').datepicker("setDate", new Date(start));
            $('#eventEnd').datepicker("setDate", new Date(end));
            $('#calEventDialog').dialog('open');
            selection[0] = moment(start).format();
            selection[1] = moment(end).format();
            console.log("Event Start date: " + selection[0],
                "\nEvent End date: " + selection[1]);
        },
    });
    var title = $('#eventTitle');
    var start = $('#eventStart');
    var end = $('#eventEnd');
    var eventClass, color;
    //var phone_number = getElementById("phone_number");
    //document.getElementById("mytext").value = phone_number;
    $('#calEventDialog').dialog({                   //New event dialog
        resizable: false,
        autoOpen: false,
        title: 'Add Event',
        width: 400,
        buttons: {

            Save: function () {
                $.ajax({    //sending info to server
                    type: 'POST',
                    url: '/API/room_occupation/create',
                    data: {
                        user_id: "5",
                        start_timestamp: moment(selection[0]).unix(),
                        end_timestamp: moment(selection[1]).unix(),
                        phone_number: $('#phone_number').val(),
                        is_collabortive: $('#collaborative').val(),
                        description: $('#collaborative_description').val()
                    },
                    success: function () {
                        console.log(moment(selection[0]).unix());
                        console.log(selection[1]);
                        //$('#calendar').fullCalendar('rerenderEvents');
                        //$('#calendar').fullCalendar('rerenderEvents');
                        //$('#calendar').fullCalendar('destroy');
                        //$('#calendar').fullCalendar('render');
                        destroyAndRender();
                        //console.log(start_selection);

                        //$('#calendar').fullCalendar('renderEvent', event, true);  have to render it immidiately 
                    }
                });
                // if (title.val() !== '') {
                //     $myCalendar.fullCalendar('renderEvent', {
                //         title: title.val(),
                //         start: start.val(),
                //         end: end.val(),
                //         allDay: true,
                //         className: eventClass,
                //         color: color
                //     }, true // make the event "stick"
                //     );
                // }
                //$myCalendar.fullCalendar('unselect');
                $(this).dialog('close');
            },
            Cancel: function () {
                $(this).dialog('close');
            }
        }
    });
    //existing event dialog
    $('#eventContent').dialog({
        resizable: false,
        autoOpen: false,
        title: 'Existing Event',
        width: 400,
        buttons: {
            Edit: function () {
                if ($('input:radio[name=allday]:checked').val() == "1") {
                    eventClass = "gbcs-halfday-event";
                    color = "#9E6320";
                    end.val(start.val());
                }
                else {
                    eventClass = "gbcs-allday-event";
                    color = "#875DA8";
                }
                if (title.val() !== '') {
                    $myCalendar.fullCalendar('renderEvent', {
                        title: title.val(),
                        start: start.val(),
                        end: end.val(),
                        allDay: true,
                        className: eventClass,
                        color: color
                    }, true // make the event "stick"
                    );
                }
                $myCalendar.fullCalendar('unselect');
                $(this).dialog('close');
            },
            Cancel: function () {
                $(this).dialog('close');
            }
        }
    });

    //    $('#calendar').fullCalendar('renderEvent', event, true);
});
//console.log(event);
function destroyAndRender() {
    $('#calendar').fullCalendar('removeEvents');
    $.ajax({    //rendering all events from database
        type: 'GET',
        url: '/API/room_occupation/all',
        success: function (event) {
            jQuery.each(event, function (eventindex) {
                event[eventindex].title = event[eventindex].description;
                event[eventindex].start = event[eventindex].start_timestamp;
                console.log(event[eventindex]);
                console.log(eventindex);
                $('#calendar').fullCalendar('renderEvent', event[eventindex], true);
            });
        }
    });
};
render();
function render() {             //rendering all events from database
    $.ajax({    
        type: 'GET',
        url: '/API/room_occupation/all',
        success: function (event) {
            jQuery.each(event, function (eventindex) {
                event[eventindex].title = event[eventindex].description;
                event[eventindex].start = event[eventindex].start_timestamp;
                console.log(event[eventindex]);
                console.log(eventindex);
                $('#calendar').fullCalendar('renderEvent', event[eventindex], true);
            });
        }
    });
};

