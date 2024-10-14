let interval;
//Count down from a given number of seconds and call a callback function every second
export function countDownFrom(seconds, callback) {
    interval = setInterval(() => {
        if (seconds === 0) {
            clearInterval(interval);
            callback(0);
        } else {
            seconds--;
            callback(seconds);
        }
    }, 1000);
}

export function resetCountDown() {
    if (interval) {
        clearInterval(interval);
    }
}