import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

// PERSONALIZZA QUI NOMI, FIRMA E RICORDI.
const PERSONAL = {
  signature: 'sempre tuo',
  memories: [
    {name:'IL PRIMO INCONTRO',title:'Il giorno in cui è iniziato tutto',text:'Ci sono momenti che sembrano normali mentre li stai vivendo. Poi, col tempo, capisci che erano l’inizio di qualcosa di enorme. Qui aggiungi il ricordo del vostro primo incontro.',symbol:'✧'},
    {name:'LE NOSTRE RISATE',title:'La felicità nelle cose semplici',text:'Le nostre risate, le battute che capiamo solo noi, quegli istanti in cui basta uno sguardo. Se potessi, metterei ogni tua risata in una piccola costellazione.',symbol:'☾'},
    {name:'IL NOSTRO POSTO',title:'Dove mi sento a casa',text:'A volte casa non è un posto preciso. È una voce, un abbraccio, una mano che cerca la tua. Per me, molto spesso, casa sei tu.',symbol:'♡'},
    {name:'QUELLO CHE SOGNIAMO',title:'Tutte le cose che ci aspettano',text:'Ci sono ancora strade da percorrere, posti da vedere e ricordi che non abbiamo ancora creato. Non vedo l’ora di scoprire tutto questo insieme a te.',symbol:'✦'},
    {name:'IL NOSTRO INFINITO',title:'La mia scelta, ogni volta',text:'Non posso prometterti che ogni giorno sarà perfetto. Posso dirti che voglio continuare a sceglierti, ascoltarti e costruire qualcosa di nostro, un giorno alla volta.',symbol:'∞'}
  ]
};
document.querySelector('#signature').textContent=PERSONAL.signature;
const canvas=document.querySelector('#universe');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x03040c);scene.fog=new THREE.FogExp2(0x03040c,.0021);
const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,1800);camera.position.set(0,1,28);
const clock=new THREE.Clock();
scene.add(new THREE.AmbientLight(0x7d81ba,.48));
const keyLight=new THREE.PointLight(0xd6b5ff,80,180);keyLight.position.set(0,5,4);scene.add(keyLight);
const pinkLight=new THREE.PointLight(0xa34aff,45,110);pinkLight.position.set(-20,7,-35);scene.add(pinkLight);
const blueLight=new THREE.PointLight(0x398aff,55,100);blueLight.position.set(22,-8,-80);scene.add(blueLight);
const world=new THREE.Group();scene.add(world);
function makeGlowTexture(){
 const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
 g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(236,190,255,.8)');g.addColorStop(.35,'rgba(155,105,255,.22)');g.addColorStop(1,'rgba(100,80,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);
}
const glowTex=makeGlowTexture();
function glow(pos,size,color,opacity=1){const m=new THREE.SpriteMaterial({map:glowTex,color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending});const s=new THREE.Sprite(m);s.position.copy(pos);s.scale.set(size,size,1);world.add(s);return s}
// dense starfield as a point cloud
const starCount=6500,positions=new Float32Array(starCount*3),colors=new Float32Array(starCount*3),sizes=new Float32Array(starCount);
const palette=[new THREE.Color('#d9d9ff'),new THREE.Color('#f8c9f1'),new THREE.Color('#9acbff'),new THREE.Color('#fff1d2')];
for(let i=0;i<starCount;i++){const r=THREE.MathUtils.randFloat(35,720),theta=Math.random()*Math.PI*2,phi=Math.acos(THREE.MathUtils.randFloatSpread(2));positions[i*3]=r*Math.sin(phi)*Math.cos(theta);positions[i*3+1]=r*Math.cos(phi);positions[i*3+2]=-Math.abs(r*Math.sin(phi)*Math.sin(theta))-8;const col=palette[Math.floor(Math.random()*palette.length)];colors.set(col.toArray(),i*3);sizes[i]=Math.random()*.9+.15}
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));starGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));const starMat=new THREE.PointsMaterial({size:.7,vertexColors:true,transparent:true,opacity:.85,sizeAttenuation:true,depthWrite:false});const starCloud=new THREE.Points(starGeo,starMat);world.add(starCloud);
// A few colored nebula clouds, made from layered transparent sprites.
for(let i=0;i<34;i++){const p=new THREE.Vector3(THREE.MathUtils.randFloatSpread(180),THREE.MathUtils.randFloatSpread(80),-THREE.MathUtils.randFloat(25,260));const color=[0x7545ff,0x4b6eff,0xc04ba7,0x2879ba][i%4];glow(p,THREE.MathUtils.randFloat(12,40),color,THREE.MathUtils.randFloat(.035,.12))}
function makePlanet({name,pos,radius,color,roughness=.78,metalness=.05,ring=false,glowColor=0x9e69ff}){
 const group=new THREE.Group();group.position.copy(pos);world.add(group);
 const geo=new THREE.SphereGeometry(radius,64,48);const mat=new THREE.MeshStandardMaterial({color,roughness,metalness});const mesh=new THREE.Mesh(geo,mat);group.add(mesh);
 // lit atmosphere rim
 const atmo=new THREE.Mesh(new THREE.SphereGeometry(radius*1.075,48,36),new THREE.MeshBasicMaterial({color:glowColor,transparent:true,opacity:.10,side:THREE.BackSide,blending:THREE.AdditiveBlending}));group.add(atmo);
 glow(new THREE.Vector3(0,0,0).add(pos),radius*5,glowColor,.25);
 if(ring){const rg=new THREE.RingGeometry(radius*1.3,radius*2.1,128);const rm=new THREE.MeshBasicMaterial({color:0xd9b3ed,side:THREE.DoubleSide,transparent:true,opacity:.52});const r=new THREE.Mesh(rg,rm);r.rotation.x=Math.PI*.38;r.rotation.y=.13;group.add(r)}
 const hit=new THREE.Mesh(new THREE.SphereGeometry(radius*1.5,24,16),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));hit.userData={planetName:name};group.add(hit);interactives.push(hit);
 return {group,mesh,hit,name};
}
const interactives=[];const planets=[];
planets.push(makePlanet({name:'first',pos:new THREE.Vector3(-16,3,-34),radius:3.3,color:0x7650a8,roughness:.82,glowColor:0xc07bff}));
planets.push(makePlanet({name:'laugh',pos:new THREE.Vector3(17,7,-68),radius:5,color:0x426ba5,roughness:.55,metalness:.1,ring:true,glowColor:0x6db8ff}));
planets.push(makePlanet({name:'home',pos:new THREE.Vector3(-20,-9,-103),radius:4.1,color:0x9d527e,roughness:.8,glowColor:0xf08bcb}));
planets.push(makePlanet({name:'dream',pos:new THREE.Vector3(14,-11,-139),radius:5.8,color:0x317c81,roughness:.6,ring:true,glowColor:0x66dfdb}));
planets.push(makePlanet({name:'future',pos:new THREE.Vector3(0,5,-178),radius:4.7,color:0xb18a65,roughness:.9,glowColor:0xffd59b}));
// distant binary star destination
const destination=new THREE.Group();destination.position.set(0,1,-245);world.add(destination);
const starA=new THREE.Mesh(new THREE.SphereGeometry(2.5,48,48),new THREE.MeshBasicMaterial({color:0xffe8ff}));destination.add(starA);
const starB=new THREE.Mesh(new THREE.SphereGeometry(1.4,40,40),new THREE.MeshBasicMaterial({color:0xffa9df}));starB.position.set(3.7,.8,0);destination.add(starB);
glow(destination.position,38,0xb67aff,.8);glow(destination.position,17,0xf2a6e5,.55);
const ray=new THREE.PointLight(0xe8a7ff,130,90);ray.position.copy(destination.position);scene.add(ray);
// faint orbital dust around final star
for(let i=0;i<500;i++){const a=Math.random()*Math.PI*2,r=THREE.MathUtils.randFloat(6,15);const dot=new THREE.Mesh(new THREE.SphereGeometry(Math.random()*.055+.015,6,6),new THREE.MeshBasicMaterial({color:i%3?0xb89aff:0xf6c7ed,transparent:true,opacity:.7}));dot.position.set(Math.cos(a)*r,Math.sin(a)*r*.32,-245+THREE.MathUtils.randFloatSpread(3));world.add(dot)}
let mode='intro',elapsed=0,journeyStart=0,selected=null,seen=new Set(),lastPlanet=null;
const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let pointerX=0,pointerY=0,targetX=0,targetY=0;let cameraBase=new THREE.Vector3(0,1,28);
const mission=document.querySelector('#mission'),label=document.querySelector('#planetLabel'),hint=document.querySelector('#exploreHint'),reticle=document.querySelector('#reticle'),progress=document.querySelector('#progressBar');
const nameMap={first:'IL PRIMO INCONTRO',laugh:'LE NOSTRE RISATE',home:'IL NOSTRO POSTO',dream:'I NOSTRI SOGNI',future:'IL NOSTRO FUTURO'};
function launch(){mode='flight';journeyStart=clock.elapsedTime;document.querySelector('#intro').classList.remove('active');mission.classList.add('visible');hint.classList.add('visible');reticle.classList.add('visible');document.querySelector('#endHint').classList.add('hidden');document.querySelector('#missionTitle').textContent='IL NOSTRO UNIVERSO';document.querySelector('#missionSub').textContent='Avvicinati a una stella';}
document.querySelector('#launch').addEventListener('click',launch);
function openMemory(key){const index=planets.findIndex(p=>p.name===key);const data=PERSONAL.memories[Math.max(0,index)];if(!data)return;seen.add(key);document.querySelector('#memoryOverline').textContent=data.name;document.querySelector('#memoryTitle').textContent=data.title;document.querySelector('#memoryText').textContent=data.text;document.querySelector('#memoryArt').innerHTML=`<span>${data.symbol}</span>`;document.querySelector('#memory').showModal();document.querySelector('#missionSub').textContent=`${seen.size} / 5 frammenti scoperti`;progress.style.width=(seen.size/5*70)+'%';}
document.querySelector('#closeMemory').addEventListener('click',()=>document.querySelector('#memory').close());document.querySelector('#memoryContinue').addEventListener('click',()=>document.querySelector('#memory').close());document.querySelector('#memory').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
function finish(){mode='finale';document.querySelector('#memory').close();document.querySelector('#finale').classList.add('active');mission.classList.remove('visible');hint.classList.remove('visible');reticle.classList.remove('visible');label.classList.remove('visible');progress.style.width='100%';}
function restart(){mode='intro';elapsed=0;seen.clear();document.querySelector('#finale').classList.remove('active');document.querySelector('#intro').classList.add('active');mission.classList.remove('visible');hint.classList.remove('visible');reticle.classList.remove('visible');progress.style.width='0';camera.position.set(0,1,28);camera.rotation.set(0,0,0);document.querySelector('#endHint').classList.remove('hidden');}
document.querySelector('#again').addEventListener('click',restart);
function updatePointer(e){pointerX=(e.clientX/innerWidth-.5)*2;pointerY=(e.clientY/innerHeight-.5)*2;pointer.set((e.clientX/innerWidth)*2-1,-(e.clientY/innerHeight)*2+1)}
window.addEventListener('pointermove',updatePointer,{passive:true});
window.addEventListener('pointerdown',e=>{if(mode!=='flight')return;updatePointer(e);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(interactives,false);if(hits.length){const key=hits[0].object.userData.planetName;openMemory(key)}else if(camera.position.z < -220){finish()}});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&mode==='flight')label.classList.remove('visible');if(e.key==='Enter'&&mode==='intro')launch()});
const audioButton=document.querySelector('#audioButton');let audioCtx=null,osc=null,gain=null,audioOn=false;
audioButton.addEventListener('click',()=>{if(!audioOn){try{audioCtx=new(window.AudioContext||window.webkitAudioContext)();osc=audioCtx.createOscillator();gain=audioCtx.createGain();osc.type='sine';osc.frequency.value=110;gain.gain.value=.018;osc.connect(gain);gain.connect(audioCtx.destination);osc.start();audioOn=true;audioButton.innerHTML='♫ <span>AUDIO ON</span>'}catch(e){audioButton.innerHTML='♫ <span>NON DISPONIBILE</span>'}}else{gain.gain.setTargetAtTime(0,audioCtx.currentTime,.1);osc.stop(audioCtx.currentTime+.3);audioOn=false;audioButton.innerHTML='♫ <span>AUDIO OFF</span>'}});
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime(),dt=Math.min(clock.getDelta(),.04);starCloud.rotation.y=t*.0009;starCloud.rotation.x=Math.sin(t*.04)*.006;planets.forEach((p,i)=>{p.group.rotation.y=t*(.035+i*.009);p.mesh.rotation.x=.05*Math.sin(t*.2+i);});destination.rotation.y=t*.12;
 targetX+=(pointerX-targetX)*.025;targetY+=(pointerY-targetY)*.025;
 if(mode==='intro'){camera.position.x+=(targetX*1.2-camera.position.x)*.018;camera.position.y+=(1-targetY*.8-camera.position.y)*.018;camera.position.z+=(28-camera.position.z)*.018;camera.lookAt(0,0,-55); }
 if(mode==='flight'){const travel=clock.elapsedTime-journeyStart;const z=28-Math.min(travel*7.4,245);camera.position.z+=(z-camera.position.z)*.025;camera.position.x+=(targetX*5-camera.position.x)*.012;camera.position.y+=(1-targetY*3-camera.position.y)*.012;camera.lookAt(camera.position.x+targetX*1.8,camera.position.y+targetY*1.3,camera.position.z-32);const sector=Math.max(1,Math.min(5,Math.floor((28-camera.position.z)/44)+1));document.querySelector('#mission-index');document.querySelector('.mission-index').textContent=String(sector).padStart(2,'0');document.querySelector('#coordinates').textContent=`SETTORE ${String(sector).padStart(2,'0')} · ${Math.max(0,Math.floor(245-camera.position.z))} UNITÀ`;progress.style.width=(Math.min(98,Math.max(0,(28-camera.position.z)/273*100)))+'%';
 raycaster.setFromCamera(new THREE.Vector2(0,0),camera);const hits=raycaster.intersectObjects(interactives,false);if(hits.length){const key=hits[0].object.userData.planetName;if(lastPlanet!==key){lastPlanet=key;label.textContent='✦  '+nameMap[key]+'  ·  TOCCA PER APRIRE';label.classList.add('visible')}const v=hits[0].object.getWorldPosition(new THREE.Vector3()).project(camera);label.style.left=(v.x*.5+.5)*innerWidth+'px';label.style.top=(-v.y*.5+.5)*innerHeight+'px';}else{lastPlanet=null;label.classList.remove('visible')}
 if(camera.position.z < -231){finish()}
 }
 if(mode==='finale'){camera.position.z+=(-245-camera.position.z)*.01;camera.position.x+=(0-camera.position.x)*.01;camera.position.y+=(1-camera.position.y)*.01;camera.lookAt(0,1,-245)}
 renderer.render(scene,camera)}
animate();
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight)});
