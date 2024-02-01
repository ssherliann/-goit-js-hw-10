import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
let userSelectedDate;
let difference;
let intervalId; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        updateButtonState();

        const userSelectedDateMs = userSelectedDate.getTime();
        const todayDateMs = new Date().getTime();
        difference = userSelectedDateMs - todayDateMs;

        updateCountdown();
    },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener("click", () => {
    startButton.disabled = true;

    intervalId = setInterval(() => {
        difference -= 1000;
        updateCountdown();

        if (difference <= 0) {
            clearInterval(intervalId); 
            startButton.disabled = false; 
        }
    }, 1000);
});

function updateButtonState() {
    if (userSelectedDate && userSelectedDate > new Date()) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
    }
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateCountdown() {
    const { days, hours, minutes, seconds } = convertMs(difference);

    const dataDays = document.querySelector('[data-days]');
    const dataHours = document.querySelector('[data-hours]');
    const dataMinutes = document.querySelector('[data-minutes]');
    const dataSeconds = document.querySelector('[data-seconds]');

    if (difference <= 0) {
        dataDays.textContent = "00";
        dataHours.textContent = "00";
        dataMinutes.textContent = "00";
        dataSeconds.textContent = "00";
    } else {
        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);
    }
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
