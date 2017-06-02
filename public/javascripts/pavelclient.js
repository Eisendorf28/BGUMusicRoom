var j = 3; //just a function to show that clients can also process.
j = j + 3;
window.j = j;
$(document).ready(function() {

    // page is now ready, initialize the calendar...
  //$('#calendar').fullCalendar('next'); //what does it do?
   $('#calendar').fullCalendar({
        defaultView: 'agendaWeek',
        duration: {days: 7},
        dayCount: {days: 7}
   });
    $('#calendar').fullCalendar({
        dayClick: function() {
        //alert('a day has been clicked!');
        console.log('adsdadsa');}
    })
   // $('#calendar'.fullCalendar.agendaWeek);
});
