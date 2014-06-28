// Userlist data array for filling in info box
var volunteerListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    $('#volunteerList table tbody').on('click', 'td a.linkshowvolunteer', showVolunterInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

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
    $('#volunteerInfoFirstName').text(thisVolunteerObject.first_name);
    $('#volunteerInfoLastName').text(thisVolunteerObject.last_name);
    $('#volunteerInfoAge').text(thisVolunteerObject.age);

};
