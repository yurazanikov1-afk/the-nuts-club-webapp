const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let checkType = null;

function show(id) {
    ["mainScreen","checkScreen","loadingScreen","resultScreen","historyScreen","scheduleScreen"]
        .forEach(s => {
            const el = document.getElementById(s);
            if (el) el.classList.add("hidden");
        });
    document.getElementById(id).classList.remove("hidden");
}

function openCheck(){ show("checkScreen"); }
function openHistory(){ renderHistory(); show("historyScreen"); }
function openSchedule(){ show("scheduleScreen"); }
function openAbout(){ alert("The NUTS Club\nExperimental beta service"); }
function back(){ show("mainScreen"); }

function setType(btn){
    document.querySelectorAll(".types button").forEach(b => b.classList.remove("primary"));
    btn.classList.add("primary");
    checkType = btn.innerText;
}

function checkCall(){
    const phone = document.getElementById("phone").value;
    if(!phone || !checkType){
        alert("Введите номер и тип");
        return;
    }

    show("loadingScreen");

    setTimeout(() => {
        const results = [
            {icon:"✅",title:"VERIFIED",desc:"Номер выглядит безопасным",class:"status-ok"},
            {icon:"⚠️",title:"SUSPICIOUS",desc:"Обнаружена подозрительная активность",class:"status-warn"},
            {icon:"❌",title:"UNKNOWN",desc:"Недостаточно данных",class:"status-bad"}
        ];

        const res = results[Math.floor(Math.random()*results.length)];

        document.getElementById("resultIcon").innerText = res.icon;
        const t = document.getElementById("resultTitle");
        t.innerText = res.title;
        t.className = res.class;

        document.getElementById("resultNumber").innerText = phone;
        document.getElementById("resultDesc").innerText = res.desc;

        saveHistory(phone,res.title);
        show("resultScreen");
    },1500);
}

function saveHistory(phone,status){
    const h = JSON.parse(localStorage.getItem("history") || "[]");
    h.unshift({phone,status,time:new Date().toLocaleString()});
    localStorage.setItem("history",JSON.stringify(h.slice(0,20)));
}

function renderHistory(){
    const list = document.getElementById("historyList");
    const h = JSON.parse(localStorage.getItem("history") || "[]");
    list.innerHTML = h.length ? h.map(i =>
        `<div class="card"><b>${i.phone}</b><br>${i.status}<br><small>${i.time}</small></div>`
    ).join("") : "<p class='subtitle'>История пуста</p>";
}
