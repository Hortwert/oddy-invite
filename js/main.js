const DATA = {
    "percentage": 60,
};

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

window.addEventListener('resize', fillProgress);

loadChat();
startTextLoading();
fillProgress();

console.log("script finished!");