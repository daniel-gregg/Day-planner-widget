
const timeArr = ["0000", "0030", "0100", "0130", "0200", "0230", "0300", "0330", "0400", "0430", "0500", "0530", "0600", "0630", "0700", "0730", "0800", "0830", "0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230", "2300", "2330",]

const scheduledEvent = {
    short: "", //short description of event
    long: "", //long description of event
    location: "", //location of event
    busy: false, //show as busy or not? 
}

function renderTimeValues() {
    var table = document.querySelector(".table-body");
    for(i=0; i<timeArr.length; i++){
        time = timeArr[i]
        const tableRow = `
            <tr id="${time}">
                <td class="hour"><span>${time}</span></td>
                <td class="eventSpace"><span class="scheduledEvent" onclick="showEvent()"></span></td>
                <td><span class="add" onclick="addEvent(this)">➕</span></td>
                <td><span class="delete" onclick="deleteEvent(this)">🗑️</span></td>
            </tr>`
        table.innerHTML += tableRow
    }
  }

window.onload = renderTimeValues;

function addEvent(clicked){
    // add form popup function here.
    document.querySelector(".popup-form").style.display = "block";


    //get target element to fill event details with
    targetElement = clicked.parentElement.previousElementSibling;

    targetElement.innerHTML = event.short;
}

function deleteEvent(clicked){
    //get target element to fill event details with
    targetElement = clicked.parentElement.previousElementSibling.previousElementSibling;

    targetElement.innerHTML = "";
}

function showEvent(){
    //show event details on click
}