/**
 * This function receives a text and a maximum length and returns the text with a maximum length.
 * initializer
 * @param tab
 * @param maxWords
 * @returns {*}
 */

function initializer(tab, maxWords) {
    tab = filterText(textToTab(tab));  // Conversion en tableau de mots et filtrage
    let newText = '';
    let i = 0;
    let wordCount = 0;  // Compteur de mots
    while (wordCount < maxWords && i < tab.length) {  // Limiter par nombre de mots
        newText += tab[i] + ' ';
        i++;
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


//test
let test = 'Lorem ipsum dolor';
test = pushWord(test,'Lorem');


export { initializer, textToTab, pushWord, DisplayText, filterText };
