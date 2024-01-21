import "flatpickr/dist/flatpickr.min.css";

const todayDate = new Date();
let userSelectedDate;
let difference;
let startButton;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates[0];
        updateButtonState();

        let userSelectedDateMs = userSelectedDate.getTime();
        let todayDateMs = todayDate.getTime();
        difference = userSelectedDateMs - todayDateMs;
        console.log(convertMs(difference));

        updateCountdown();

        startButton.addEventListener("click", () => {
            const intervalId = setInterval(() => {
                difference -= 1000; 
                updateCountdown();
                if (difference <= 0) {
                    clearInterval(intervalId);
                }
            }, 1000);
        });
    },
};

flatpickr("#datetime-picker", options);

function updateButtonState() {
    startButton = document.querySelector('[data-start]');

    if (userSelectedDate && userSelectedDate > todayDate) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
    }
};


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
};

function updateCountdown() {
    const { days, hours, minutes, seconds } = convertMs(difference);

    const dataDays = document.querySelector('[data-days]');
    const dataHours = document.querySelector('[data-hours]');
    const dataMinutes = document.querySelector('[data-minutes]');
    const dataSeconds = document.querySelector('[data-seconds]');

    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};