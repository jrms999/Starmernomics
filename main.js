// Starmernomics: Prototype Game Logic

const stats = {
    day: 1,
    economy: 50,
    happiness: 50,
    security: 50,
    approval: 50,
    alive: true
};

const events = [
    {
        text: "Parliament proposes a major tax increase to fund healthcare. What do you do?",
        choices: [
            { text: "Approve", effect: { economy: -5, happiness: +5, security: 0, approval: +3 } },
            { text: "Deny", effect: { economy: 0, happiness: -7, security: -2, approval: -4 } },
            { text: "Modify (smaller increase)", effect: { economy: -2, happiness: +2, security: 0, approval: +2 } }
        ]
    },
    {
        text: "Cyberattack on the NHS! Immediate response needed.",
        choices: [
            { text: "Mobilize security forces", effect: { economy: -3, happiness: -2, security: +8, approval: +2 } },
            { text: "Downplay incident", effect: { economy: 0, happiness: -4, security: -7, approval: -5 } }
        ]
    },
    {
        text: "Press demands clarity on housing crisis policy.",
        choices: [
            { text: "Promise new homes", effect: { economy: -7, happiness: +7, security: 0, approval: +4 } },
            { text: "Blame previous government", effect: { economy: 0, happiness: -3, security: 0, approval: -2 } }
        ]
    },
    {
        text: "Protest erupts outside Parliament over energy prices.",
        choices: [
            { text: "Negotiate with protesters", effect: { economy: -2, happiness: +4, security: +1, approval: +2 } },
            { text: "Deploy riot police", effect: { economy: -1, happiness: -5, security: +6, approval: -3 } }
        ]
    },
    {
        text: "Rumors of internal party coup. How do you respond?",
        choices: [
            { text: "Meet with party leaders", effect: { economy: 0, happiness: +1, security: +2, approval: +5 } },
            { text: "Ignore rumors", effect: { economy: 0, happiness: -2, security: -3, approval: -4 } }
        ]
    }
];

function renderStats() {
    document.getElementById("stats").innerHTML =
        `Day: ${stats.day}<br>
        Economy: ${stats.economy}<br>
        Happiness: ${stats.happiness}<br>
        Security: ${stats.security}<br>
        Approval: ${stats.approval}`;
}

function gameOver(reason) {
    stats.alive = false;
    document.getElementById("event").innerHTML = `<b>GAME OVER:</b> ${reason}`;
    document.getElementById("choices").innerHTML = "";
    document.getElementById("nextDay").style.display = "none";
}

let currentEvent = 0;

function renderEvent() {
    if (!stats.alive) return;
    if (currentEvent >= events.length) {
        document.getElementById("event").innerHTML = "You've survived all events! Victory!";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("nextDay").style.display = "none";
        return;
    }
    const event = events[currentEvent];
    document.getElementById("event").textContent = event.text;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    event.choices.forEach((choice, idx) => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => {
            applyEffect(choice.effect);
            document.getElementById("nextDay").style.display = "inline-block";
            choicesDiv.innerHTML = "";
        };
        choicesDiv.appendChild(btn);
    });
}

function applyEffect(effect) {
    for (const key in effect) {
        stats[key] += effect[key];
    }
    // Clamp stats
    stats.economy = Math.max(0, Math.min(100, stats.economy));
    stats.happiness = Math.max(0, Math.min(100, stats.happiness));
    stats.security = Math.max(0, Math.min(100, stats.security));
    stats.approval = Math.max(0, Math.min(100, stats.approval));
    renderStats();
    // Check loss conditions
    if (stats.economy <= 0) return gameOver("Economy collapsed!");
    if (stats.happiness <= 0) return gameOver("Public despair leads to resignation!");
    if (stats.security <= 0) return gameOver("Country falls into chaos!");
    if (stats.approval <= 0) return gameOver("Approval rating hit zero. You are ousted!");
}

document.getElementById("nextDay").onclick = () => {
    stats.day++;
    currentEvent++;
    renderStats();
    renderEvent();
    document.getElementById("nextDay").style.display = "none";
};

function startGame() {
    renderStats();
    renderEvent();
}
startGame();
