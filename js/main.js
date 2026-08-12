const DATA = {
    "percentage": 60,
};

var BASICCOMMANDS = {
    "percentage": `Прогресс подключения: ${DATA["percentage"]}`,
    "help": "Нативная консоль OT-C v0.6. Разработка продолжается. Чтобы увидеть доступные команды, введите coms",
    "status": "Текущий уровень доступа: average_user[0].",
};

var consoleOutput = [];
const CONSOLE_HISTORY = 10; //количество отображаемых последних команд

const delay = ms => new Promise(res => setTimeout(res, ms));



async function startTextLoading(){
    console.log("start text loading...");
    while (1){
        document.getElementById("loading").textContent = "Connecting to Oddy Temple.";
        await delay(150);
        document.getElementById("loading").textContent = "Connecting to Oddy Temple..";
        await delay(150);
        document.getElementById("loading").textContent = "Connecting to Oddy Temple...";
        await delay(300);
    }
};

function fillProgress(){
    const progressDiv = document.getElementById("progress");

    while(progressDiv.firstChild){
        progressDiv.removeChild(progressDiv.firstChild);
    };

    const width = window.innerWidth;
    
    //console.log(width);

    for (let i = 1; i < (width / 15); i++) {
        var progressBarPoint = document.createElement("img");
        progressBarPoint.src = "img/progressBarPoint.png";

        if (100 / (width / 15) * i > DATA["percentage"]) {
            progressBarPoint.setAttribute("class", "inactiveProgressPoint");
        }else{
            progressBarPoint.setAttribute("class", "activeProgressPoint");
        };
        progressDiv.appendChild(progressBarPoint);
    };

    var list = document.getElementsByClassName("activeProgressPoint");
    var lastProgressPoint = list[list.length - 1];
    lastProgressPoint.src = "img/progressBarPoint.gif";
};

async function loadChat() {
    try {
        const response = await fetch("js/chat.html");
        if (!response.ok) throw new Error('Ошибка загрузки');

        const htmlText = await response.text();
        document.getElementById('groupChat').innerHTML = htmlText;
        console.log("итс окэй")
    } catch (error) {
        console.error("ошибка загрузки чата")
        document.getElementById('groupChat').textContent = "Ошибка загрузки чата...";
    }
}
async function loadContent() {
    try {
        const response = await fetch("js/subcontent.html");
        if (!response.ok) throw new Error('Ошибка загрузки');

        const htmlText = await response.text();
        const container = document.getElementById('subContent');
        container.innerHTML = htmlText;

        container.addEventListener('keydown', (event) => {
            if (event.target && event.target.id === 'consoleInput' && event.key === 'Enter') {
                consoleInput(event.target.value);
            }
        });

        console.log("итс окэй")
    } catch (error) {
        console.error("ошибка загрузки контента", error);
        document.getElementById('subContent').textContent = error.message;
    }
}

function consoleInput(input) {
    var output;
    if (input in BASICCOMMANDS) {
        output = BASICCOMMANDS[input];
    } else {
        if (input == "coms") {
            output = Object.keys(BASICCOMMANDS);
        }else if (input == "clear") {
            output = "";
            consoleOutput = [];
        } else {
            output = "Команда не включена в данную версию, или у вас отсутствует привелегированный доступ. Проверьте состояние доступа командой status.";
        }
    }
    updateConsoleOutput(input, output);
    document.getElementById("consoleInput").value = ""
}

function updateConsoleOutput(input, output) {
    const consoleOutputField = document.getElementsByClassName("consoleOutput")[0];
    consoleOutput.push("> " + input);
    consoleOutput.push(output);
    if (consoleOutput.length > CONSOLE_HISTORY) {
        consoleOutput.shift();
        consoleOutput.shift();
    }
    consoleOutputField.textContent = ""
    for (let i = 0; i < consoleOutput.length; i++) {
        consoleOutputField.innerHTML += `<p>${consoleOutput[i]}</p>`;
    }
}



window.addEventListener('resize', fillProgress);

document.addEventListener('click', function() {
    const audio = document.getElementById('bg-music');
    // Если музыка еще не играет, запускаем
    if (audio.paused) {
        audio.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        }
}, { once: true }); // { once: true } — сработает только один раз

loadChat();
loadContent()
startTextLoading();
fillProgress();



console.log("script finished!");