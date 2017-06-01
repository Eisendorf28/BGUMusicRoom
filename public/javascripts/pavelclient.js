var j = 3;
j = j + 3;
window.j = j;
$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        dayClick: function() {
        alert('a a day has been clicked!');
    }
    })

});
