// Userlist data array for filling in info box
var volunteerListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateVolunteerTable();
    $('#volunteerList table tbody').on('click', 'td a.linkshowvolunteer', showVolunterInfo);
    $('#btnAddVolunteer').on('click', createVolunteer);
    $('#volunteerList table tbody').on('click', 'td a.linkdeletevolunteer', deleteVolunteer);

    populateEventTable();
    $('#eventList table tbody').on('click', 'td a.linkshowevent', showEventInfo);
    $('#btnAddEvent').on('click', createEvent);
    $('#eventList table tbody').on('click', 'td a.linkdeleteevent', deleteEvent);

});

// Functions =============================================================

// Fill table with data
function populateVolunteerTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/volunteers/volunteerlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        volunteerListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowvolunteer" rel="' + this.email + '" title="Show Details">' + this.email + '</td>';
            tableContent += '<td>' + this.first_name + '</td>';
            tableContent += '<td>' + this.last_name + '</td>';
            tableContent += '<td>' + this.mobile_phone + '</td>';
            tableContent += '<td>' + this.age + '</td>';
            tableContent += '<td>' + this.city + '</td>';
            tableContent += '<td>' + this.state + '</td>';
            tableContent += '<td>' + this.zip + '</td>';
            tableContent += '<td>' + this.event_type + '</td>';
            tableContent += '<td><a href="#" class="linkdeletevolunteer" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#volunteerList table tbody').html(tableContent);
    });
};

// Show User Info
function showVolunterInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisVolunteerName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = volunteerListData.map(function(arrayItem) { return arrayItem.email; }).indexOf(thisVolunteerName);

    // Get our User Object
    var thisVolunteerObject = volunteerListData[arrayPosition];

    //Populate Info Box
    $('#volunteerInfoEmail').text(thisVolunteerObject.email);
    $('#volunteerInfoFirstName').text(thisVolunteerObject.first_name);
    $('#volunteerInfoLastName').text(thisVolunteerObject.last_name);
    $('#volunteerInfoAge').text(thisVolunteerObject.age);
    $('#volunteerInfoCity').text(thisVolunteerObject.city);
    $('#volunteerInfoState').text(thisVolunteerObject.state);
    $('#volunteerInfoZip').text(thisVolunteerObject.zip);
    $('#volunteerInfoEventType').text(thisVolunteerObject.event_type);

};

// Add Volunteer
function createVolunteer(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addVolunteer input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newVolunteer = {
            'email': $('#addVolunteer fieldset input#inputVolunteerEmail').val(),
            'first_name': $('#addVolunteer fieldset input#inputVolunteerFirstName').val(),
            'last_name': $('#addVolunteer fieldset input#inputVolunteerLastName').val(),
            'mobile_phone': $('#addVolunteer fieldset input#inputVolunteerMobilePhone').val(),
            'age': $('#addVolunteer fieldset input#inputVolunteerAge').val(),
            'city': $('#addVolunteer fieldset input#inputVolunteerCity').val(),
            'state': $('#addVolunteer fieldset input#inputVolunteerState').val(),
            'zip': $('#addVolunteer fieldset input#inputVolunteerZip').val(),
            'event_type': $('#addVolunteer fieldset input#inputVolunteerEventType').val(),
        }

        // Use AJAX to post the object to our createvolunteer service
        $.ajax({
            type: 'POST',
            data: newVolunteer,
            url: '/volunteers/createvolunteer',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === 'Successfully created volunteer') {

                // Clear the form inputs
                $('#addVolunteer fieldset input').val('');

                // Update the table
                populateVolunteerTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteVolunteer(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this volunteer?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/volunteers/deletevolunteer/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === 'Successfully deleted volunteer') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateVolunteerTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};




function populateEventTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/events/eventlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        eventListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowevent" rel="' + this.name + '" title="Show Details">' + this.name + '</td>';
            tableContent += '<td>' + this.city + '</td>';
            tableContent += '<td>' + this.state + '</td>';
            tableContent += '<td>' + this.start_time + '</td>';
            tableContent += '<td>' + this.end_time + '</td>';
            tableContent += '<td>' + this.date + '</td>';
            tableContent += '<td>' + this.event_type + '</td>';
            tableContent += '<td>' + this.volunteers_needed + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteevent" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#eventList table tbody').html(tableContent);
    });
};

function showEventInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisEventName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = eventListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisEventName);

    // Get our User Object
    var thisEventObject = eventListData[arrayPosition];

    //Populate Info Box
    $('#eventInfoEventName').text(thisEventObject.name);
    $('#eventInfoCity').text(thisEventObject.city);
    $('#eventInfoState').text(thisEventObject.state);
    $('#eventInfoDate').text(thisEventObject.date);
    $('#eventInfoType').text(thisEventObject.event_type);

};

function createEvent(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addEvent input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newEvent = {
            'name': $('#addEvent fieldset input#inputEventName').val(),
            'city': $('#addEvent fieldset input#inputEventCity').val(),
            'state': $('#addEvent fieldset input#inputEventState').val(),
            'start_time': $('#addEvent fieldset input#inputEventStartTime').val(),
            'end_time': $('#addEvent fieldset input#inputEventEndTime').val(),
            'date': $('#addEvent fieldset input#inputEventDate').val(),
            'event_type': $('#addEvent fieldset input#inputEventEventType').val(),
            'volunteers_needed': $('#addEvent fieldset input#inputEventVolunteersNeeded').val()
        }

        // Use AJAX to post the object to our createevent service
        $.ajax({
            type: 'POST',
            data: newEvent,
            url: '/events/createevent',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === 'Successfully created event') {

                // Clear the form inputs
                $('#addEvent fieldset input').val('');

                // Update the table
                populateEventTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

function deleteEvent(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this event?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/events/deleteevent/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === 'Successfully deleted event') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateEventTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};