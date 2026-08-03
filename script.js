const enCheck = document.getElementById("en");
const ruCheck = document.getElementById("ru");

const btn = document.getElementById("telegraph");
const text = document.getElementById("text");
const curSym = document.getElementById("curSym");
const timeOfLongSig = document.getElementById("timeOfLongSig");
const timeBetweenWords = document.getElementById("timeBetweenWords");


let lang = "en";

enCheck.checked = true;

enCheck.onchange = () => {
    if (enCheck.checked) {
        lang = "en";
        ruCheck.checked = false;
    }
};

ruCheck.onchange = () => {
    if (ruCheck.checked) {
        lang = "ru";
        enCheck.checked = false;
    }
};


btn.addEventListener("pointerdown", press);
btn.addEventListener("pointerup", release);
btn.addEventListener("pointercancel", release);

const RU={
".-":"а","-...":"б",".--":"в","--.":"г","-..":"д",".":"е","...-":"ж","--..":"з","..":"и",
".---":"й","-.-":"к",".-..":"л","--":"м","-.":"н","---":"о",".--.":"п",".-.":"р","...":"с",
"-":"т","..-":"у","..-.":"ф","....":"х","-.-.":"ц","---.":"ч","----":"ш","--.-":"щ",
"-.--":"ы","-..-":"ь","..-..":"э","..--":"ю",".-.-":"я",
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",
    ".-.-.-":".",
    "--..--":",",
    "..--..":"?",
    ".----.":"'",
    "-.-.--":"!",
    "-..-.":"/",
    "-.--.":"(",
    "-.--.-":")",
    ".-...":"&",
    "---...":":",
    "-.-.-.":";",
    "-...-":"=",
    ".-.-.":"+",
    "-....-":"-",
    "..--.-":"_",
    ".-..-.":"\"",
    "...-..-":"$",
    ".--.-.":"@"
};

const EN={
".-":"a","-...":"b","-.-.":"c","-..":"d",".":"e","..-.":"f","--.":"g","....":"h","..":"i",
".---":"j","-.-":"k",".-..":"l","--":"m","-.":"n","---":"o",".--.":"p","--.-":"q",".-.":"r",
"...":"s","-":"t","..-":"u","...-":"v",".--":"w","-..-":"x","-.--":"y","--..":"z",
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",
    ".-.-.-":".",
    "--..--":",",
    "..--..":"?",
    ".----.":"'",
    "-.-.--":"!",
    "-..-.":"/",
    "-.--.":"(",
    "-.--.-":")",
    ".-...":"&",
    "---...":":",
    "-.-.-.":";",
    "-...-":"=",
    ".-.-.":"+",
    "-....-":"-",
    "..--.-":"_",
    ".-..-.":"\"",
    "...-..-":"$",
    ".--.-.":"@"
};

let pressTime = 0;
let currentCode = "";
let resultText = "";

let letterTimer;
let spaceTimer;

function press() {
    pressTime = Date.now();
    clearTimeout(letterTimer);
    clearTimeout(spaceTimer); // ← обязательно
}

function release() {

    
    const duration = Date.now() - pressTime;

    // Определяем точку или тире
    currentCode += duration < Number(timeOfLongSig.value) ? "." : "-";
    curSym.textContent = currentCode;

    // Ждем окончания буквы
    letterTimer = setTimeout(() => {
        if (currentCode === "........") {

            clearTimeout(spaceTimer);

            while (resultText.endsWith(" ")) {
                resultText = resultText.slice(0, -1);
            }

            resultText = resultText.slice(0, -1);
            text.textContent = resultText;

            currentCode = "";
            curSym.textContent = "";
            return;
        }

        const alphabet = lang === "en" ? EN : RU;
        resultText += alphabet[currentCode] || "?";

        text.textContent = resultText;
        currentCode = "";
        curSym.textContent = "";

        clearTimeout(spaceTimer);

        // Если долго ничего не нажимают — добавить пробел
        spaceTimer = setTimeout(() => {
            resultText += " ";
            text.textContent = resultText;
        }, Number(timeBetweenWords.value));

    }, Number(timeOfLongSig.value) * 2);
}

document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});


document.onkeydown = (e) => {
    if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        press();
    }
};

document.onkeyup = (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        release();
    }
};


