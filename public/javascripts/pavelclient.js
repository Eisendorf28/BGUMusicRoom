// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
// var nowISO = moment().toISOString();
// var now = moment();
// document.write(now);
//Should I delete entries every time or save them? If i delete them - i need to use visibleRange to restrict former weeks.
$(document).ready(function () {
    // page is now ready, initialize the calendar...
    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        slotDuration: '01:00:00',
        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        slotEventOverlap: false,                //what if drums/piano are taken away?   
        nowIndicator: true,
        displayEventTime: true,                 //on events
        displayEventEnd: true,                 //same 
        //dayPopoverFormat,                     //change later
        selectable: true,
        selectHelper: true,
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
