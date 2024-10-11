//Count down from a given number of seconds and call a callback function every second
export function countDownFrom(seconds, callback) {
    let interval = setInterval(() => {
        if (seconds === 0) {
            clearInterval(interval);
            callback(0);
        } else {
            seconds--;
            callback(seconds);
        }
    }, 1000);
}