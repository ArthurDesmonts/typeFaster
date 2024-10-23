/**
 * Check if the userName is compliant with the regex pattern
 * @param string
 * @returns {boolean}
 */
function checkNameExpression(string) {
    const userIdPattern = /^[a-zA-Z0-9_-]{3,16}$/;
    return userIdPattern.test(string);
}

/**
 * Return a list of characters that are not allowed in the userName
 * @param string
 * @returns {*[]}
 */
function badCharactersIndexes(string){
    let listOfBadCharacters = [];
    for (let i = 0 ; i < string.length ; i++){
        if (string[i].match(/^([!%@#$^*?~`"']+)$/)){
            listOfBadCharacters.push(string[i]);
        }
    }
    return listOfBadCharacters;
}

/**
 * Check if the userName is valid (target characters that could cause problems to the data treatment or to prevent injections)
 * @param userName
 * @param alertDiplayObject
 * @returns {*}
 */
export function validateUserName(userName,alertDiplayObject) {
    try{
        if (!checkNameExpression(userName)){
            const errorString = "Le(s) charactère(s) suivant(s) est/sont interdit(s) : " + badCharactersIndexes(userName) + " ";
            throw new Error(errorString);
        }
    }catch (err){
        alertDiplayObject.value = err.message;
        return err.message;
    }
}

/**
 * UI gestion for the input border appearance
 * @param input
 */
const addBorder = (input) => {
    input.value.classList.add("border");
    input.value.classList.add("border-red-500");
};

/**
 * UI gestion for the input border closure
 * @param input
 */
const removeBorder = (input) => {
    input.value.classList.remove("border");
    input.value.classList.remove("border-red-500");
};

/**
 * Gesture of the input check vars and display the alert message if necessary
 * @param refInput
 * @param inputVal
 * @param alertMessageContainer
 * @returns {boolean}
 */
export function checkInputs(refInput, inputVal, alertMessageContainer) {
    alertMessageContainer.value = "";
    removeBorder(refInput);
    validateUserName(inputVal,alertMessageContainer);
    if (alertMessageContainer.value !== "") {
        addBorder(refInput);
        return false;
    }
    return true;
}