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

const addBorder = (input) => {
    input.value.classList.add("border");
    input.value.classList.add("border-red-500");
};

const removeBorder = (input) => {
    input.value.classList.remove("border");
    input.value.classList.remove("border-red-500");
};


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