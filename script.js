// Personalizza qui i ricordi, i nomi e la dedica finale.
const CONFIG = {
  initials: ["T", "I"], // sostituisci con le vostre iniziali
  signature: "il tuo amore",
  memories: {
    first: {n:"FRAMMENTO 01", title:"Il primo incontro", text:"Non sapevo ancora che quel giorno sarebbe diventato uno dei miei preferiti. Qui racconta come è iniziato tutto, con i dettagli che solo voi conoscete.", symbol:"✧"},
    laugh: {n:"FRAMMENTO 02", title:"Le nostre risate", text:"Quelle volte in cui ridiamo per niente e il resto del mondo sembra sparire. Vorrei collezionare ogni tua risata, come stelle da tenere con me.", symbol:"☾"},
    little: {n:"FRAMMENTO 03", title:"Le piccole cose", text:"Il tuo sorriso, il modo in cui dici certe cose, i gesti che forse nemmeno noti. Sono dettagli minuscoli che per me significano un universo intero.", symbol:"♡"},
    dream: {n:"FRAMMENTO 04", title:"I nostri sogni", text:"Ci sono così tanti posti da vedere e cose da vivere. Il mio sogno preferito è continuare a creare ricordi insieme a te, un'avventura alla volta.", symbol:"✦"},
    future: {n:"FRAMMENTO 05", title:"Tutto quello che verrà", text:"Non so esattamente cosa ci aspetta, ma so con chi vorrei scoprirlo. Che sia una giornata perfetta o una giornata difficile, vorrei esserci, con te.", symbol:"∞"}
  }
};
const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll(".screen")];
const labels = ["MISSIONE 01 · IL RICHIAMO","MISSIONE 02 · SISTEMA SOLARE","MISSIONE 03 · ALLINEAMENTO","MISSIONE 04 · PER SEMPRE"];
let current = 0, discovered = new Set(), lit = new Set();
function showScreen(id, index) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  current = index; $("#chapterLabel").textContent = labels[index];
  window.scrollTo({top:0,behavior:"smooth"});
}
$("#launchBtn").addEventListener("click", () => showScreen("flight",1));
const modal = $("#memoryModal");
document.querySelectorAll("[data-memory]").forEach(btn => btn.addEventListener("click", () => {
  const m = CONFIG.memories[btn.dataset.memory];
  $("#modalKicker").textContent=m.n; $("#modalTitle").textContent=m.title;
  $("#modalText").textContent=m.text; $("#modalImage").innerHTML=`<span>${m.symbol}</span>`;
  modal.showModal(); discovered.add(btn.dataset.memory); $("#discovered").textContent=String(discovered.size).padStart(2,"0");
  if(discovered.size===5) $("#constellationBtn").innerHTML='Tutti i ricordi trovati <span>→</span>';
}));
$("#closeModal").addEventListener("click",()=>modal.close());
$("#modalNext").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});
$("#constellationBtn").addEventListener("click",()=>showScreen("constellation",2));
$("#initials").innerHTML=`${CONFIG.initials[0]}<span>♡</span>${CONFIG.initials[1]}`;
$("#signature").textContent=CONFIG.signature;
document.querySelectorAll(".constellation-star").forEach((star,i)=>star.addEventListener("click",()=>{
  star.classList.add("lit");lit.add(i);
  if(lit.size===7){$("#constellationStage").classList.add("completed");$("#finalBtn").disabled=false;$("#finalBtn").textContent="La costellazione è completa ♡";$("#toast").textContent="Avete trovato il vostro posto tra le stelle.";$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2600)}
}));
$("#finalBtn").addEventListener("click",()=>{if(lit.size===7)showScreen("finale",3)});
$("#replayBtn").addEventListener("click",()=>{discovered.clear();lit.clear();$("#discovered").textContent="00";document.querySelectorAll(".constellation-star").forEach(s=>s.classList.remove("lit"));$("#constellationStage").classList.remove("completed");$("#finalBtn").disabled=true;$("#finalBtn").innerHTML='Scopri il messaggio finale <span>↗</span>';showScreen("intro",0)});

// Animated starfield with a short warp effect during launch. No external assets required.
const canvas=$("#space"),ctx=canvas.getContext("2d");let w,h,dpr,stars=[],warp=0,last=0;
function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(230,Math.floor(w*h/4200))},()=>({x:Math.random()*w,y:Math.random()*h,z:Math.random()*1+.15,r:Math.random()*1.2+.2,a:Math.random()*.65+.2}))}
function draw(t){ctx.clearRect(0,0,w,h);const dt=Math.min((t-last)/16||1,2);last=t;for(const s of stars){s.y+=s.z*(current===1?1.3:.22)*dt;if(s.y>h+3){s.y=-3;s.x=Math.random()*w}let alpha=s.a*(.7+.3*Math.sin(t*.001*s.z+s.x));ctx.beginPath();ctx.fillStyle=`rgba(205,204,255,${alpha})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();if(warp>0){ctx.strokeStyle=`rgba(173,151,255,${warp*.16})`;ctx.lineWidth=s.r;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x+(s.x-w/2)*.025*warp,s.y+(s.y-h/2)*.025*warp);ctx.stroke()}}warp=Math.max(0,warp-.035);requestAnimationFrame(draw)}
window.addEventListener("resize",resize);resize();requestAnimationFrame(draw);
$("#launchBtn").addEventListener("click",()=>{warp=8});
$("#soundToggle").addEventListener("click",()=>{const b=$("#soundToggle");b.classList.toggle("on");b.innerHTML=b.classList.contains("on")?'♫ <span>ATTIVO</span>':'♫ <span>SUONO</span>';$("#toast").textContent=b.classList.contains("on")?"Puoi aggiungere la vostra canzone al progetto.":"Audio disattivato";$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),1800)});
