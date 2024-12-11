import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  resetOnHover: true,
  color: 'red',
  position: 'topRight',
});

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

// Доступ до окремих значень за атрибутами
const daysValue = timer.querySelector('[data-days]');
const hoursValue = timer.querySelector('[data-hours]');
const minutesValue = timer.querySelector('[data-minutes]');
const secondsValue = timer.querySelector('[data-seconds]');

let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= Date.now()) {
      iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      startBtn.classList.toggle('disabled');
      datePicker.classList.toggle('disabled');
    } else {
      startBtn.disabled = false;
      startBtn.classList.remove('disabled');
      datePicker.classList.add('active');
      datePicker.classList.remove('disabled');
    }
  },
};

flatpickr(datePicker, options);

startBtn.addEventListener('click', startTimer);

function updateTime({ days, hours, minutes, seconds }) {
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
}
let intervalId = null;
function startTimer() {
  intervalId = setInterval(() => {
    const acutalTime = Date.now();
    const timerValue = userSelectedDate - acutalTime;
    if (timerValue <= 0) {
      clearInterval(intervalId); // Зупиняємо таймер
      updateTime(convertMs(0)); // Встановлюємо значення на 00:00:00:00
      iziToast.show({
        title: 'Finished!',
        message: 'Timer finished!',
      });
      return;
    }
    const time = convertMs(timerValue);

    updateTime(time);
  }, 1000);

  datePicker.disabled = true;
  startBtn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
