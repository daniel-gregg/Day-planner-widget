
const timeArr = ["0000", "0030", "0100", "0130", "0200", "0230", "0300", "0330", "0400", "0430", "0500", "0530", "0600", "0630", "0700", "0730", "0800", "0830", "0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230", "2300", "2330",]
const tb = document.querySelector(".table-body");  //this is the element holding the rows by half hour
const formWrapper = document.querySelector("#popup-form")
const $form = document.querySelector('#eventForm');
const scheduledEvent = {
    short: "", //short description of event
    long: "", //long description of event
    location: "", //location of event
    isfilled: false, //show as busy or not? 
}

function onStart(event) {
    //render the day planner field
    renderTimeValues();

    //set interval
    startInterval();

    //render events stored in local storage
    renderEvents();
    
    }

  function renderTimeValues(){

    var table = document.querySelector(".table-body");
    for(i=0; i<timeArr.length; i++){
        time = timeArr[i]
        const tableRow = `
            <tr id="${time}">
                <td class="hour"><span>${time}</span></td>
                <td class="eventSpace"><span class="scheduledEvent" onclick="showEvent()"></span></td>
                <td><span class="add">➕</span></td>
                <td><span class="delete">🗑️</span></td>
            </tr>`
        table.innerHTML += tableRow
    } 
    renderPastTime();
}

function startInterval(){
    timer = setInterval(renderPastTime(),30000)  //update every 30 seconds
}

function renderEvents(){
    var check = JSON.parse(localStorage.getItem("scheduled"));
    if(check == null){
        setArr = new Array(48).fill(scheduledEvent)
        localStorage.setItem("scheduled",JSON.stringify(setArr))
        scheduled = setArr;
    } else {
        scheduled = check
    }
    fillCurrentEvents()
}

function fillCurrentEvents(){
    for(i=0; i<timeArr.length; i++){
        currentEvent = scheduled[i];
        if(currentEvent.isfilled = true){
            textFill = currentEvent.short;
            rowID = timeArr[i];
            document.getElementById(rowID).children[1].innerText = textFill;
        }
    } 
}

function renderPastTime(){
    //check which rows are in the past and colour grey + remove onclick functionality
    var time = dayjs().format("HHMM");
    for(i=0;i<timeArr.length;i++){
        tableTimeVal = parseInt(timeArr[i])
        if(tableTimeVal<time){
            //change cell colour and remove onclick
            var row = tb.children[i];
            row.style.backgroundColor = "grey";
        }
    }
}

window.onload = onStart();

document.addEventListener('click', function (event) {

	if (event.target.matches('.add')) {
		addEvent(event.target);
	}

	if (event.target.matches('.delete')) {
		deleteEvent(event.target);
	}

}, false);

function addEvent(clicked){
    var time = dayjs().format("HHMM");
    rowID = parseInt(clicked.parentElement.parentElement.id)
    if(checkPastTime(time,rowID)){return} //return if time is in the past

    // add form popup function here.
    toggleForm()

    //get target element to fill event details with
    //targetElement = clicked.parentElement.previousElementSibling;
    //targetElement.innerHTML = scheduledEvent.short;
}

function deleteEvent(clicked){
    event.preventDefault();
    var time = dayjs().format("HHMM");
    var rowID = parseInt(clicked.parentElement.parentElement.id)
    if(checkPastTime(time,rowID)){return} //return if time is in the past

    targetElement = clicked.parentElement.previousElementSibling.previousElementSibling;
    targetElement.innerHTML = "";
}

function checkPastTime(time,target) {
    if(time>target){
        var check = true
    } else {
        var check = false
    }
    return check
}

function showEvent(){
    //show event details on click
}

function submitEvent(event){
    event.preventDefault()
    event.stopPropagation()
    //Enter data into relevant table cells
    var eventEl = document.getElementById(rowID).children[1];
    var shortTitle = document.getElementById("short-title").value;
    var eventLocation = document.getElementById("location").value;
    var eventDetails = document.getElementById("details").value;
    eventEl.innerText = shortTitle;

    //Enter data into local storage array
    arrayIndex = timeArr.indexOf(rowID.toString())
    const newEvent = scheduled[arrayIndex]
    newEvent.short = shortTitle;
    newEvent.long = eventDetails;
    newEvent.location = eventLocation;
    newEvent.isfilled = true;
    localStorage.setItem("scheduled",JSON.stringify(scheduled));

    //return to main screen
    toggleForm()
}

function toggleForm() {
    if(formWrapper.style.display == "none"){
        formWrapper.style.display = "block";
        document.querySelector(".container").style.display = "none";

    } else {
        formWrapper.style.display = "none";
        document.querySelector(".container").style.display = "block";
    }
}

$form.addEventListener('submit', submitEvent);