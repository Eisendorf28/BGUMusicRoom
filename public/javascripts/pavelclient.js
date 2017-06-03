// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
$(document).ready(function () {

    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        slotDuration: '01:00:00',
        allDaySlot: false,
        // duration: {days: 1} // doesn't work
        header: {
            center: 'agendaWeek',       //, more views 
            left: 'title',              //the date title
            right: 'walla today prev,next'    //today, prev and next 
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
        customButtons: {
            walla: {    //the name of my custom buttin
                text: 'custom!',
                click: function () {
                    alert('clicked the custom button!');
                }
            }
        },
    })
});
