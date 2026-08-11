const delay = ms => new Promise(res => setTimeout(res, ms));

function main() {
    startTextLoading();
    console.log("script finished!")
}

async function startTextLoading(){
    console.log("start text loading...")
    while (1){
        document.getElementById("loading").textContent = "Connecting to Oddy Temple."
        await delay(100)
        document.getElementById("loading").textContent = "Connecting to Oddy Temple.."
        await delay(100)
        document.getElementById("loading").textContent = "Connecting to Oddy Temple..."
        await delay(500)
    }
}

main()