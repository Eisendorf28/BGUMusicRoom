// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
var now = moment().add(3, 'hours');
var nowISO = now.toISOString();
var laterISO = now.clone().add(3, 'days').toISOString();
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
var event = { id: 1, title: 'New event', start: nowISO2, end: laterISO2 };
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
//          dayClick: function (selectInfo) {
//              $(function () {
//     $('#select_link').click(function (e) {
//         e.preventDefault();
//         console.log('select_link clicked');

//         /*$.ajax({
//            dataType: 'jsonp',
//            data: "data=yeah",						
//            jsonp: 'callback',
//            url: 'http://localhost:3000/endpoint?callback=?',						
//            success: function(data) {
//                console.log('success');
//                console.log(JSON.stringify(data));
//            }
//        });*/
//         var data = {};
//         data.title = "title";
//         data.message = "message";

//         $.ajax({
//             type: 'POST',
//             data: JSON.stringify(data),
//             contentType: 'application/json',
//             url: 'http://localhost:3000/create',
//             success: function (data) {
//                 console.log('success');
//                 console.log(JSON.stringify(data));
//             }
//         });
//         /*$.ajax('http://localhost:3000/endpoint', {
//                 type: 'POST',
//                 data: JSON.stringify(data),
//                 contentType: 'application/json',
//                 success: function() { console.log('success');},
//                 error  : function() { console.log('error');}
//         });*/
//     });
// });
//          },
        customButtons: {
            walla: {    //the name of my custom button
                text: 'custom!',
                click: function () {
                    alert('clicked the custom button!');
                }
            }
        },
    });
    $('#calendar').fullCalendar('renderEvent', event, true);

});
console.log(event);
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

