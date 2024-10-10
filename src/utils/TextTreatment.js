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
    return newText;  // Supprimer l'espace final
}

const filterText = (array) => {
    return array.filter(word => word.length <= 8 && !word.includes('-'));
};

function textToTab(text) {
    return text.split(' ');
}

function pushWord(text, restrictedText, word) {
    //TODO: implement this function
}

function DisplayText(array) {
    return array.join(' ');
}

export { initializer, textToTab, pushWord, DisplayText, filterText };
