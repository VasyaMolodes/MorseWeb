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

btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    press();
}, { passive: false });

btn.addEventListener("touchend", (e) => {
    e.preventDefault();
    release();
}, { passive: false });

btn.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    release();
}, { passive: false });

const RU={
".-":"А","-...":"Б",".--":"В","--.":"Г","-..":"Д",".":"Е","...-":"Ж","--..":"З","..":"И",
".---":"Й","-.-":"К",".-..":"Л","--":"М","-.":"Н","---":"О",".--.":"П",".-.":"Р","...":"С",
"-":"Т","..-":"У","..-.":"Ф","....":"Х","-.-.":"Ц","---.":"Ч","----":"Ш","--.-":"Щ",
"-.--":"Ы","-..-":"Ь","..-..":"Э","..--":"Ю",".-.-":"Я",
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
".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E","..-.":"F","--.":"G","....":"H","..":"I",
".---":"J","-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",".--.":"P","--.-":"Q",".-.":"R",
"...":"S","-":"T","..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y","--..":"Z",
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


btn.onmousedown = press;
btn.onmouseup = release;


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


