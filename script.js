const memories = [
  {
    image: "foto/foto1.jpg",
    title: "Il momento in cui tutto è iniziato",
    text: "Ci sono ricordi che sembrano piccoli, finché non capisci quanto significano."
  },
  {
    image: "foto/foto2.jpg",
    title: "Uno dei miei posti preferiti",
    text: "Non importa dove siamo, se ci sei tu quel posto diventa speciale."
  },
  {
    image: "foto/foto3.jpg",
    title: "Una giornata qualunque",
    text: "Ed è proprio questo che amo: anche le giornate normali con te diventano ricordi."
  },
  {
    image: "foto/foto4.jpg",
    title: "Un'altra piccola stella",
    text: "Un momento che vorrei poter rivivere ancora e ancora."
  },
  {
    image: "foto/foto5.jpg",
    title: "Noi",
    text: "Tra milioni di persone, sono felice che le nostre strade si siano incontrate."
  },
  {
    image: "foto/foto6.jpg",
    title: "E non è finita qui",
    text: "Queste sono solo alcune delle stelle. Le più belle devono ancora arrivare."
  }
];

let current = 0;
const img = document.getElementById("memoryImage");
const title = document.getElementById("memoryTitle");
const text = document.getElementById("memoryText");
const number = document.getElementById("memoryNumber");
const card = document.getElementById("photoCard");
const dots = document.getElementById("dots");

memories.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Vai alla foto ${i + 1}`);
  dot.addEventListener("click", () => showMemory(i));
  dots.appendChild(dot);
});

function showMemory(index) {
  current = (index + memories.length) % memories.length;
  card.classList.add("changing");

  setTimeout(() => {
    const m = memories[current];
    img.src = m.image;
    title.textContent = m.title;
    text.textContent = m.text;
    number.textContent = `${String(current + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
    [...dots.children].forEach((d, i) => d.classList.toggle("active", i === current));
    card.classList.remove("changing");
  }, 280);
}

document.getElementById("prevBtn").addEventListener("click", () => showMemory(current - 1));
document.getElementById("nextBtn").addEventListener("click", () => showMemory(current + 1));

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
});

// Swipe mobile
let touchStartX = 0;
card.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX, {passive:true});
card.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 45) showMemory(current + (dx < 0 ? 1 : -1));
}, {passive:true});

// Optional music. Browser permits playback only after user interaction.
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicToggle");
let musicOn = false;

musicBtn.addEventListener("click", async () => {
  if (!music.querySelector("source") && !music.src) {
    alert("Aggiungi una musica nel file index.html, dentro il tag <audio>.");
    return;
  }
  try {
    if (musicOn) {
      music.pause();
      musicOn = false;
      musicBtn.textContent = "♪";
    } else {
      await music.play();
      musicOn = true;
      musicBtn.textContent = "❚❚";
    }
  } catch (e) {
    console.log(e);
  }
});
