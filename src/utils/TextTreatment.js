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

const filterText = (array) => {
    return array.filter(word => word.length <= 8 && !word.includes('-'));
};

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

function DisplayText(array) {
    return array.join(' ');
}

function cleanString(text) {
    return text.replace(/[^a-zA-Z]/g, '');
}

function countWpm(array, additionalChar){
    return Math.round((array.join('').length + additionalChar)/4.7 * 2);
}


export { initializer, textToTab, pushWord, DisplayText, filterText, cleanString, countWpm };
