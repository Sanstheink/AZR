const bootLogs = [
  "Initializing LCARS Interface...",
  "Loading Starfleet Protocols...",
  "Primary Systems Online...",
  "Navigation Online...",
  "USS AZURA READY"
];

let role = "CREW";

window.onload = () => bootSequence();

function bootSequence() {
  const log = document.getElementById("bootLog");
  const bar = document.getElementById("bootBar");
  const sound = document.getElementById("bootSound");
  sound.play();

  let i = 0;
  let progress = 0;

  const interval = setInterval(() => {
    if (i < bootLogs.length) {
      log.innerHTML += bootLogs[i] + "<br>";
      i++;
    }
    progress += 20;
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showScreen("loginScreen");
      }, 1000);
    }
  }, 800);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login() {
  const code = document.getElementById("authCode").value;
  const status = document.getElementById("loginStatus");

  if (code === "AZR-CREW-1626") role = "CREW";
  else if (code === "AZR-CAPTAIN-G") role = "CAPTAIN";
  else if (code === "STARFLEET-ADM-01") role = "ADMIRAL";
  else role = "GUEST";

  status.innerText = "Authorization Accepted";
  document.getElementById("roleLabel").innerText = role;

  setTimeout(() => showScreen("mainUI"), 1000);
}

function alertShip(type) {
  const audio = document.getElementById("alertSound");

  if (type === "red") {
    document.body.style.background = "#400";
    audio.src = "assets/red_alert.mp3";
  }
  if (type === "yellow") {
    document.body.style.background = "#440";
    audio.src = "assets/yellow_alert.mp3";
  }
  if (type === "blue") {
    document.body.style.background = "#004";
    audio.src = "assets/blue_alert.mp3";
  }

  audio.play();
}

function reboot() {
  if (role === "CREW") {
    alert("INSUFFICIENT AUTHORIZATION");
    return;
  }
  showScreen("bootScreen");
  document.getElementById("bootLog").innerHTML = "";
  document.getElementById("bootBar").style.width = "0%";
  bootSequence();
}
