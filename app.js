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
    {
        icon: "✅",
        title: "VERIFIED",
        desc: "Number is safe",
        class: "status-ok"
    },
    {
        icon: "⚠️",
        title: "SUSPICIOUS",
        desc: "Suspicious activity detected",
        class: "status-warn"
    },
    {
        icon: "❌",
        title: "UNKNOWN",
        desc: "No data available",
        class: "status-bad"
    }
];

        const res = results[Math.floor(Math.random() * results.length)];

        document.getElementById("resultIcon").innerText = res.icon;

const titleEl = document.getElementById("resultTitle");
titleEl.innerText = res.title;
titleEl.className = res.class;

document.getElementById("resultNumber").innerText = phone;
document.getElementById("resultDesc").innerText = res.desc;

        show("resultScreen");
    }, 1500);
}
