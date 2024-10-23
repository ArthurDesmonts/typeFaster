/**
 * This function receives a text and a maximum length and returns the text with a maximum length.
 * initializer
 * @param tab
 * @param maxWords
 * @returns {*}
 */

function initializer(tab, maxWords) {
    tab = filterText(textToTab(tab));  // Conversion en tableau de mots et filtrage
    let newText = "";
    let wordCount = 0;  // Compteur de mots
    while (wordCount < maxWords && wordCount < tab.length) {  // Limiter par nombre de mots
        newText += tab[wordCount] + ' ';
        wordCount++;  // Incrémenter le compteur de mots
    }
    newText.replaceAll('  ', ' ');
    return newText.trim();
}

/**
 * This function receives an array of words and returns an array of words that are less than 8 characters long and do not contain a hyphen.
 * @param array
 * @returns {*}
 */
const filterText = (array) => {
    return array.filter(word => word.length <= 8 && !word.includes('-'));
};

/**
 * This function receives a text and returns an array of words.
 * @param text
 * @returns {*}
 */
function textToTab(text) {
    return text.split(' ');
}

/**
 * This function receives a text and a word and removes the word from the text.
 * @param text
 */
function pushWord(text) {
    const tab = textToTab(text);
    tab.splice(0, 1);
    return tab.join(' ');
}

/**
 * This function receives an array of words
 * @param array
 * @returns {*}
 * @constructor
 */
function DisplayText(array) {
    return array.join(' ');
}

/**
 * This function receives a text and removes all non-alphabetic characters.
 * @param text
 * @returns {string}
 */
function cleanString(text) {
    return text.replace(/[^a-zA-Z]/g, '');
}

/**
 * This function receives an array of words and an additional character count and returns the number of words per minute.
 * @param array
 * @param additionalChar
 * @returns {number}
 */
function countWpm(array, additionalChar){
    return Math.round((array.join('').length + additionalChar)/4.7 * 2);
}


export { initializer, textToTab, pushWord, DisplayText, filterText, cleanString, countWpm };
