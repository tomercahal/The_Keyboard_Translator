const {
    dialog
} = require('electron') //Only need to import the dialog lib from electron.

const prompt = require('electron-prompt');

var inputLang = '';
var data;

//Here the dictionaries will be, and future ones add here.
const eng_to_heb = { // This is the English to Hebrew dictionary
    'q': '/', 'w': '\'', 'e': 'ק', 'r': 'ר', 't': 'א', 'y': 'ט', 'u': 'ו', 'i': 'ן', 'o': 'ם', 'p': 'פ', 'a': 'ש', 's': 'ד', 'd': 'ג', 'f': 'כ', 'g': 'ע',
    'h': 'י', 'j': 'ח', 'k': 'ל', 'l': 'ך', ';': 'ף', '\'': ',', 'z': 'ז', 'x': 'ס', 'c': 'ב', 'v': 'ה', 'b': 'נ', 'n': 'מ', 'm': 'צ', '\,': 'ת', '.': 'ץ', '/': '.',
}

const heb_to_eng = { //This is the Hebrew to English dictionary
    '/': 'q', '\'': 'w', 'ק': 'e', 'ר': 'r', 'א': 't', 'ט': 'y', 'ו': 'u', 'ן': 'i', 'ם': 'o', 'פ': 'p', 'ש': 'a', 'ד': 's', 'ג': 'd', 'כ': 'f', 'ע': 'g', 'י': 'h', 'ח': 'j',
    'ל': 'k', 'ך': 'l', 'ף': ';', ',': '\'', 'ז': 'z', 'ס': 'x', 'ב': 'c', 'ה': 'v', 'נ': 'b', 'מ': 'n', 'צ': 'm', 'ת': ',', 'ץ': '.', '.': '/',
}

const translations = { //Using this key and value string to the actualy dict object in the translate function. Add more here for new lenguages
    'eng_to_heb': eng_to_heb,
    'heb_to_eng': heb_to_eng
}

async function getInput(inputType) {
    if (inputType === 'langSelect') { // Used when selcting the languages.
        var data = await prompt({
            title: 'Dictionary',
            label: 'Language to translate from and lagnuague to translate to' + ':',
            value: '',
            inputAttrs: {
                type: 'text'
            },
            type: 'select',
            selectOptions: { // select options if using 'select' type, more languages for drop-down menu add here 
                'eng_to_heb': 'English to Hebrew',
                'heb_to_eng': 'Hebrew to English'
            },
            width : 500,
            height : 175
        })
        return data
    }
    else if (inputType === 'data') { //Used when giving the input (After enetering languages).
        var data = await prompt({
            title: 'Dictionary',
            label: 'Data to translate' + ':',
            value: '',
            inputAttrs: {
                type: 'text'
            },
            type: 'input',
            width : 500,
            height : 175
        })
        return data
    }
    else {
        console.log('bad inputType for getInput')
    }
}

function convertAndShow(langObject, inputData) {
// This function translates the jibrish according to the languages selcted, it is given a dictionary to use and returns the translated data.
    let retString = ''

    for (var i = 0; i < inputData.length; i++) {
        if (langObject[inputData.charAt(i)]) {
            retString += langObject[inputData.charAt(i)];
        } else {
            retString += inputData.charAt(i);
        }
    }
    console.log("The translated text is: " + retString);
    dialog.showMessageBox(null, {
        message: retString
    })

}

async function translate() {
    getInput('langSelect')
        .then(retLang => {
            console.log("The dictionary we are using is: " + retLang)
            inputLang = retLang
            getInput('data')
                .then(retData => {
                    console.log("The input the user entered: " + retData + "  (some charcters might look weird since not all letters are supported)")
                    data = retData
                    convertAndShow(translations[inputLang], data);
                })
        })

}

module.exports = { // These are the functions that are going to be exported when another file imports dict.js, mains.js does that.
    translate,
    getInput
}