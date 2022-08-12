const hourEl = document.getElementById("hour")
const minuteEL = document.getElementById("minutes")
const secondsEl = document.getElementById("seconds")
const ampmEl = document.getElementById("ampm")

function updateClock() {
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    let s = new Date().getSeconds()

    let ampm = "AM"
    if(h > 12){
        h = h - 12
        ampm = "PM"
    }
    // traducere daca ora e mai mica ca 10 pune 0 + h daca nu doar pune h
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    

    hourEl.innerText = h;
    minuteEL.innerText = m;
    secondsEl.innerText = s;
    ampmEl.innerText =ampm;
    // seteaza un timp care executa o functie dupa ce timpul expira/    primul parametru e functia dupa e durata de asteptare pana la executie
    setTimeout(()=>{
        updateClock()
    }, 1000)
}

updateClock();