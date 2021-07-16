class Time {
  constructor(hour, minute, second) {
    this.hour = Number(hour);
    this.minute = Number(minute);
    this.second = Number(second);
  }

  // Decrease a second and display to input HTML
  decreaseSecond(hourElement, minuteElement, secondElement) {
    if(this.hour !== 0 || this.minute !== 0 || this.second !== 0) {
      if(this.second === 0) {
        this.second = 59;
        if(this.minute === 0) {
          this.minute = 59;
          this.hour--;
        }
        else this.minute--;
      }
      else this.second--;
    }
    this.displayToInputHTML(hourElement, minuteElement, secondElement);
  }

  displayToInputHTML(hourElement, minuteElement, secondElement) {
    let attributes = [this.hour.toString(), 
      this.minute.toString(), this.second.toString()];
    attributes = attributes.map(attr => (attr.length === 1) ? 
      ("0" + attr) : attr);

    hourElement.value = attributes[0];
    minuteElement.value = attributes[1];
    secondElement.value = attributes[2];
  }
}