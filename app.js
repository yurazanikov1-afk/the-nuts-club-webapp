const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let checkType = null;

function show(id) {
    ["mainScreen", "checkScreen", "loadingScreen", "resultScreen", "historyScreen"]
        .forEach(s => {
            const el = document.getElementById(s);
            if (el) el.classList.add("hidden");
        });
    document.getElementById(id).classList.remove("hidden");
}

function openCheck() {
    show("checkScreen");
}

function openHistory() {
    show("historyScreen");
}

function back() {
    show("mainScreen");
}

function setType(btn) {
    document.querySelectorAll(".types button")
        .forEach(b => b.classList.remove("primary"));
    btn.classList.add("primary");
    checkType = btn.innerText;
}

function checkCall() {
    const phone = document.getElementById("phone").value;
    if (!phone || !checkType) {
        alert("Enter phone and select type");
        return;
    }

    show("loadingScreen");

    setTimeout(() => {
        const results = [
            { title: "✅ VERIFIED", desc: "Number is safe" },
            { title: "⚠️ SUSPICIOUS", desc: "Suspicious activity detected" },
            { title: "❌ UNKNOWN", desc: "No data available" }
        ];

        const res = results[Math.floor(Math.random() * results.length)];

        document.getElementById("resultTitle").innerText = res.title;
        document.getElementById("resultNumber").innerText = phone;
        document.getElementById("resultDesc").innerText = res.desc;

        show("resultScreen");
    }, 1500);
}
