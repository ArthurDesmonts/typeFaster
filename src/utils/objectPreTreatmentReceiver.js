/**
 * Getter for the text of the message
 * @param data
 * @returns {*}
 */
export function receiverText(data) {
  return data.text.text;
}

/**
 * Getter for the id of the message
 * @param data
 * @returns {*}
 */
export function receiverIDText(data) {
    return data.text.id;
}