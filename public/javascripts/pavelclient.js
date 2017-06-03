// var j = 3; //just a function to show that clients can also process.
// j = j + 3;
// window.j = j;
$(document).ready(function () {

    // page is now ready, initialize the calendar...
    //$('#calendar').fullCalendar('next'); //what does it do?
    $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        // duration: {days: 1} // doesn't work
        header: { 
            center: 'month,agendaWeek'}, // buttons for switching between views
        views: {
            agendaWeek: {
            type: 'agenda',
            duration: { days: 7 },
            buttonText: 'Week'
        }
        // ,
        // month: {
        //     type: 'month',
        //     duration: { days: 30},
        //     buttonText: 'Month'
        // }
    }
    });
    // $('#calendar').fullCalendar({
    //     dayClick: function() {
    //     //alert('a day has been clicked!');
    //     console.log('adsdadsa');}
    // })
    // $('#calendar'.fullCalendar.agendaWeek);
});
