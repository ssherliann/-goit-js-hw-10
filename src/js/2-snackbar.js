import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('input[name="delay"]');
const stateFulfilled = document.querySelector('input[value="fulfilled"]');
const stateRejected = document.querySelector('input[value="rejected"]');
const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delayValue = parseInt(delay.value, 10);

    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (stateFulfilled.checked) {
            resolve(delayValue);
        } else if (stateRejected.checked) {
            reject(delayValue);
        }
    }, delayValue);
});

    promise
    .then((delay) => {
        iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
    });
    })
    .catch((delay) => {
        iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
    });
    });
});
