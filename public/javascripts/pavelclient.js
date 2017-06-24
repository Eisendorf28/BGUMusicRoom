// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
var now = moment().add(3, 'hours');
var nowISO = now.toISOString();
var laterISO = now.clone().add(3, 'days').toISOString();
var selection = [null, null];
console.log(selection[0] + selection[1]);
//console.log(nowISO + " " + laterISO);
//Should I delete entries every time or save them? If i delete them - i need to use visibleRange to restrict former weeks.
// var businessHours = {// days of week. an array of zero-based day of week integers (0=Sunday)
//     dow: [1, 2, 3, 4], // Monday - Thursday
//     start: '10:00', // a start time (10am in this example)
//     end: '12:00' // an end time (6pm in this example)
// };
//selectInfo = this.selectInfo;
// var selected = function (selectInfo) {
//     console.log(selectInfo);
//     return selectInfo;
// }
var nowISO2 = moment().add(7, 'hours').toISOString();
var laterISO2 = moment().add(10, 'hours').toISOString();
//change
var selectValidation = function (selectInfo) {
    //console.log(selectInfo.end.title);
    var duration = moment.duration(selectInfo.end.diff(selectInfo.start));
    var hours = duration.asHours();
    //console.log(hours);
    //  debugger;
    return (hours < 3);                         //what if admin account?
}
//var event = { id: 1, title: 'New event', start: nowISO2, end: laterISO2 };
// var eventsObject = function addCalanderEvent(selectInfo) {
//     var eventObject = {
//         //title: title,
//         start: selectInfo.start,
//         end: selectInfo.end,
//         //id: id, 
//         //color: colour
//     };
//     console.log(selectInfo.start.toISOString);
//     $('#calendar').fullCalendar('renderEvent', eventObject, true);
//     return eventObject;
// }
// var newEvent = new Object();
// newEvent.title = "alright";
// newEvent.start = selectInfo;
// $('#calendar').fullCalendar( 'renderEvent', newEvent );
// console.log(newEvent.title);
// console.log(newEvent.start);
// var singleEvent = function (selectInfo) {
//     console.log("The chosen hours are: " + selectInfo.start + "until " + selectInfo.end);
//     //console.log(selectInfo());
$(document).ready(function () {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        slotDuration: '01:00:00',
        allDaySlot: false,                      //shit
        slotLabelFormat: 'HH:mm',
        slotEventOverlap: false,               //what if drums/piano are taken away?   
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
        // buttons for switching between views
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
            //                    alert(calEvent.className);
            //                alert(calEvent.className=="gbcs-halfday-event"?"1":"2");
            //                    $('#allday[value="' + calEvent.className=="gbcs-halfday-event"?"1":"2" + '"]').prop('checked', true);
            $("#eventContent").dialog("option", "buttons", [
                {
                    text: "Edit",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Delete",
                    click: function () {
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


