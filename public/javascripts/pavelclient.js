// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
var now = moment().add(3, 'hours');
var nowISO = now.toISOString();
var laterISO = now.clone().add(3 , 'days').toISOString();
console.log(nowISO + " " + laterISO);
// document.write(now);
//Should I delete entries every time or save them? If i delete them - i need to use visibleRange to restrict former weeks.
var businessHours = {// days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [1, 2, 3, 4], // Monday - Thursday
    start: '10:00', // a start time (10am in this example)
    end: '12:00' // an end time (6pm in this example)
};
var selectValidation = function (selectInfo) {
    //console.log(selectInfo);
    var duration = moment.duration(selectInfo.end.diff(selectInfo.start));
    var hours = duration.asHours();
    console.log(hours);
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
        dayClick: function () {
            //alert('a day has been clicked!');
            console.log('a day has been clicked!');
        },
        // validRange: function (nowDate) {             //only works on dates and not hours apparently
        //     console.log(now);
        //     console.log(nowDate);
        //     return {
        //         start: now,                         //not good, need to make it 1 hour from NOW
        //         end: nowDate.clone().add(3, 'days')
        //     };
        // },
        customButtons: {
            walla: {    //the name of my custom button
                text: 'custom!',
                click: function () {
                    alert('clicked the custom button!');
                }
            }
        },
    })
});
