//GLOBAL VAR : Stock the interval for the clock countdown
let interval;

/**
 * This function set an interval to countdown from a given number of seconds, ticking every second.
 * @param seconds
 * @param callback
 */
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

/**
 * Reset the countdown
 * @returns {void}
 */
export function resetCountDown() {
    if (interval) {
        clearInterval(interval);
    }
}