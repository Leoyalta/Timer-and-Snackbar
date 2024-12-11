import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');

async function formSubmit(evt) {
  evt.preventDefault();

  const delay = Number(delayInput.value);
  const value = document.querySelector('input[name="state"]:checked').value;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  })
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
      });
    });
}

promiseForm.addEventListener('submit', formSubmit);

iziToast.settings({
  resetOnHover: true,
  position: 'topRight',
});
