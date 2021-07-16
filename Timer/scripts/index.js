/* ===================GLOBAL VARIABLES=================== */
const inputs = document.querySelectorAll("input[type=text]");
const buttonsUp = document.querySelectorAll(".btn-up");
const buttonsDown = document.querySelectorAll(".btn-down");
const notifications = document.querySelectorAll(".notification");
const closeWarningButtons = document.querySelectorAll(".close-icon");
const clockTickSound = new Audio("/audios/clock-tick.wav");
const alarmSound = new Audio("/audios/alarm.mp3");
let intervalID; 
let timeoutID;
let isPlaying = false;

console.log(notifications);

// Actions when starting the timer
// Including: check the time (if all attributes is 0 => stop the timer),
// (or decrease a second and show to input)
function startTimer(currentTime) {
    if(currentTime.hour === 0 && currentTime.minute === 0 
      && currentTime.second === 0) {
        stopTimer();
        alarmSound.play();
    }
    currentTime.decreaseSecond(inputs[0], inputs[1], inputs[2]);
    clockTickSound.play();
    console.log(clockTickSound.volume);
}

// Actions when stopping the timer
// Including: show "has stoped" notification (then close it after 3 secs), 
// enable all (+ and -) buttons,
// enable all time inputs
function stopTimer() {
  showNotification(notifications[1]);
  isPlaying = false;
  clearInterval(intervalID);
  inputs.forEach(input => input.disabled = false);
  enableAllButtons();
  timeoutID = setTimeout(closeNotification, 3000, notifications[1]);
}

// Close other notifications and show a specified one
function showNotification(notification) {
  closeAllNotifications();
  notification.style = "opacity: 1;" +
    "visibility: visible;";
}

// Close a specified warning
function closeNotification(notification) {
  clearTimeout(timeoutID);
  notification.style = "opacity: 0;" +
    "visibility: hidden;";
}

// Close all notification
function closeAllNotifications() {
  clearTimeout(timeoutID);
  notifications.forEach(noti => noti.style = "opacity: 0; visibility: hidden;");
};

// Disable (+ and -) buttons when the timer starts
function disableAllButtons() {
  buttonsUp.forEach(button => button.onclick = null);
  buttonsDown.forEach(button => button.onclick = null)
}

// Re-enable buttons when the timer stops
function enableAllButtons() {
  for(let i in inputs) {
    let index = Number(i);
    if(!isNaN(index)) {
      buttonsUp[index].onclick = () => {
        let time = inputs[index].value;
        let addedTime = (Number(time) + 1).toString();
        
        if(index !== 0 && time === "59") {
          inputs[index].value = "00";
          return;
        }
  
        inputs[index].value = (addedTime.length === 1) ?
          "0" + addedTime : addedTime;
      };
  
      buttonsDown[index].onclick = () => {
        let time = inputs[index].value;
        let subtractedTime = (Number(time) - 1).toString();
  
        if(index !== 0 && time === "00") {
          inputs[index].value = "59";
          return;
        }
  
        if(index === 0 && time === "00")
          return;
  
        inputs[index].value = (subtractedTime.length === 1) ?
          "0" + subtractedTime : subtractedTime;
      }
    }
  }
}

// Handling inputs (Objective: numbers only and the max length is 2)
inputs.forEach(input => {
  input.value = "00";
  
  input.oninput = (inputHandler) => {
    let time = input.value;

    // Converted to Number to trail all beginning zeros
    let trailedNumber = Number(time).toString();
    
    //Not allow any non-digit characters (except for backspace and delete)
    if(inputHandler.data !== null && /\D/.test(inputHandler.data)) {
      input.value = time.replace(/\D/g, "");
      return;
    }
    
    //Insert beginning zero when deleting
    if(trailedNumber.length === 1) {
      input.value = "0" + trailedNumber;
      return;
    }

    //Not allow more characters when the numbers has more than 2 digits
    if(trailedNumber.length > 2) {
      input.value = trailedNumber.substr(0, 2);
      return;
    }

    //Remainder case, when the number has 2 digits
    input.value = trailedNumber;

    //For minute and second, if the value > 59 => set to 59
    if(input.id !== "hour") {
      if(Number(trailedNumber) > 59)
        input.value = "59";
    }
  };
});

enableAllButtons();

// Event handler for start button
document.querySelector("#start-btn").onclick = () => {
  let currentTime = 
    new Time(inputs[0].value, inputs[1].value, inputs[2].value);

  // If the time is valid (no attributes are 0) => start the timer 
  if(currentTime.hour !== 0 || currentTime.minute !== 0 || currentTime.second !== 0) {
    showNotification(notifications[0]);
    isPlaying = true;
    
    // Disable inputs and buttons
    inputs.forEach(input => input.disabled = true);
    disableAllButtons();
    
    // Decrease a second
    intervalID = setInterval(startTimer, 1000, currentTime, inputs[0].value, 
      inputs[1].value, inputs[2].value);  

    timeoutID = setTimeout(closeNotification, 3000, notifications[0]);
    return;
  }

  // Else show a warning, force user to enter the time
  showNotification(notifications[2]);
  timeoutID = setTimeout(closeNotification, 3000, notifications[2]);
}

document.querySelector("#stop-btn").onclick = () => {
  stopTimer();
};

// Event handler for reset
document.querySelector("#reset-btn").onclick = () => {
  // If the timer is not running => reset all attributes to 0
  if(!isPlaying) {
    showNotification(notifications[3]);
    timeoutID = setTimeout(closeNotification, 3000, notifications[3]);
    inputs.forEach(input => input.value = "00");
    return;
  }

  // Else show a warning that user can't reset the time
  showNotification(notifications[4]);
  timeoutID = setTimeout(closeNotification, 3000, notifications[4]);
};

// Event handler for notifications' closing buttons
for(let index in notifications) {
  if(!isNaN(Number(index))) {
    closeWarningButtons[index].onclick = () => {
      closeAllNotifications(notifications[index]);
    }
  }
}