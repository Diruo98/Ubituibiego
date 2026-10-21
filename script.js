const memories = {
  meet: {eyebrow:"IL NOSTRO INIZIO", title:"Il primo incontro", text:"Non sapevo ancora che quel giorno sarebbe diventato uno dei miei preferiti. Qui puoi raccontare com'è iniziato tutto, con i dettagli che solo noi conosciamo."},
  laugh: {eyebrow:"I MOMENTI LEGGERI", title:"Le nostre risate", text:"Le battute senza senso, gli sguardi complici e quelle volte in cui ridiamo così tanto da dimenticarci del resto del mondo."},
  dream: {eyebrow:"QUELLO CHE SOGNIAMO", title:"I nostri sogni", text:"Ci sono così tanti posti da vedere e cose da vivere. Il mio sogno preferito, però, è continuare a creare ricordi insieme a te."},
  little: {eyebrow:"LE PICCOLE COSE", title:"I dettagli che amo", text:"Il tuo sorriso, il modo in cui dici certe cose, i gesti che forse nemmeno noti. Sono piccole stelle che rendono speciale il mio universo."},
  future: {eyebrow:"TUTTO QUELLO CHE VERRÀ", title:"Il nostro futuro", text:"Non so esattamente cosa ci aspetta, ma so che voglio affrontare tante nuove avventure insieme a te. Un passo alla volta, mano nella mano."}
};
const memoryDialog = document.querySelector("#memoryDialog");
document.querySelectorAll("[data-memory]").forEach(button => {
  button.addEventListener("click", () => {
    const m = memories[button.dataset.memory];
    document.querySelector("#dialogEyebrow").textContent = m.eyebrow;
    document.querySelector("#dialogTitle").textContent = m.title;
    document.querySelector("#dialogText").textContent = m.text;
    memoryDialog.showModal();
  });
});
document.querySelectorAll(".dialog-close").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelector("#surpriseBtn").addEventListener("click", () => document.querySelector("#surpriseDialog").showModal());
const toast = document.querySelector("#toast");
let toastTimeout;
document.querySelector("#heartBtn").addEventListener("click", () => {
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
});
document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
}));
