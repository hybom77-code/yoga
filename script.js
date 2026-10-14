/* ══ MULTI-TENANT CONFIG ══ */
const TENANTS_CONFIG = {
  ananta: {
    name: 'Ananta',
    subtitle: 'tu portal de bienestar',
    colors: {
      '--bg': '#231f33',
      '--bg2': '#2d2645',
      '--border': 'rgba(127,119,221,0.22)',
      '--border2': 'rgba(127,119,221,0.4)',
      '--accent': '#7f77dd',
      '--accent2': '#b87fcf',
      '--gold': '#c9a96e',
      '--text': '#e8e0d0',
      '--text2': '#9b8fb0',
      '--text3': '#6b5a8a',
      '--purple-soft': 'rgba(127,119,221,0.15)'
    },
    logo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(127,119,221,0.3)" stroke-width=".5"/>
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(127,119,221,0.2)" stroke-width=".5"/>
          <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(201,169,110,0.25)" stroke-width=".5"/>
          <circle cx="50" cy="50" r="4" fill="rgba(127,119,221,0.6)"/>
          <g stroke="rgba(127,119,221,0.4)" stroke-width=".5" fill="none">
            <line x1="50" y1="2" x2="50" y2="98"/>
            <line x1="2" y1="50" x2="98" y2="50"/>
            <line x1="15" y1="15" x2="85" y2="85"/>
            <line x1="85" y1="15" x2="15" y2="85"/>
          </g>
          <g fill="none" stroke="rgba(201,169,110,0.35)" stroke-width=".5">
            <polygon points="50,12 88,71 12,71"/>
            <polygon points="50,88 12,29 88,29"/>
          </g>
          <g fill="rgba(127,119,221,0.5)">
            <circle cx="50" cy="12" r="1.5"/>
            <circle cx="88" cy="71" r="1.5"/>
            <circle cx="12" cy="71" r="1.5"/>
            <circle cx="50" cy="88" r="1.5"/>
            <circle cx="88" cy="29" r="1.5"/>
            <circle cx="12" cy="29" r="1.5"/>
          </g>
        </svg>`
  },
  zenith: {
    name: 'Zenith',
    subtitle: 'encuentra tu equilibrio',
    colors: {
      '--bg': '#2b4034',
      '--bg2': '#364d40',
      '--border': 'rgba(77,184,134,0.3)',
      '--border2': 'rgba(77,184,134,0.5)',
      '--accent': '#5ec796',
      '--accent2': '#8fdfc6',
      '--gold': '#e8b884',
      '--text': '#e5f2ec',
      '--text2': '#a3c2b4',
      '--text3': '#6b9c87',
      '--purple-soft': 'rgba(77,184,134,0.15)'
    },
    logo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(77,184,134,0.3)" stroke-width=".5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(77,184,134,0.4)" stroke-width="1"/>
          <polygon points="50,15 85,75 15,75" fill="none" stroke="rgba(127,207,184,0.4)" stroke-width="1"/>
          <circle cx="50" cy="55" r="10" fill="rgba(77,184,134,0.6)"/>
        </svg>`
  },
  lumina: {
    name: 'Lumina',
    subtitle: 'despierta tu luz interior',
    colors: {
      '--bg': '#192436',
      '--bg2': '#222f45',
      '--border': 'rgba(109,158,235,0.22)',
      '--border2': 'rgba(109,158,235,0.4)',
      '--accent': '#6d9eeb',
      '--accent2': '#9cb4d4',
      '--gold': '#e0c067',
      '--text': '#d4e2f5',
      '--text2': '#9cb4d4',
      '--text3': '#5a7a9e',
      '--purple-soft': 'rgba(109,158,235,0.15)'
    },
    logo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(109,158,235,0.3)" stroke-width=".5"/>
          <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="rgba(224,192,103,0.5)"/>
          <circle cx="50" cy="50" r="8" fill="rgba(109,158,235,0.8)"/>
        </svg>`
  }
};

function initTenant() {
  const urlParams = new URLSearchParams(window.location.search);
  let tenantId = urlParams.get('tenant') || 'ananta';
  if (!TENANTS_CONFIG[tenantId]) tenantId = 'ananta';
  setTenant(tenantId);
  
  const selector = document.getElementById('tenant-selector');
  if (selector) selector.value = tenantId;
}

function setTenant(tenantId) {
  const config = TENANTS_CONFIG[tenantId];
  if (!config) return;
  
  for (const [key, value] of Object.entries(config.colors)) {
    document.documentElement.style.setProperty(key, value);
  }
  
  const titleEl = document.getElementById('app-title');
  const subEl = document.getElementById('app-sub');
  const logoEl = document.getElementById('app-logo');
  
  if (titleEl) titleEl.textContent = config.name;
  if (subEl) subEl.textContent = config.subtitle;
  if (logoEl) logoEl.innerHTML = config.logo;
  
  const url = new URL(window.location);
  url.searchParams.set('tenant', tenantId);
  window.history.pushState({}, '', url);
}

document.addEventListener('DOMContentLoaded', initTenant);

/* ══ NAVIGATION ══ */
const SCREENS=['home','yoga','astro','oracle','breath','secuencia-yoga','secuencia-astro','favoritos'];
function goTo(id){
  const urlParams = new URLSearchParams(window.location.search);
  const tenant = urlParams.get('tenant') || 'ananta';
  const page = id === 'home' ? 'index.html' : id + '.html';
  window.location.href = page + '?tenant=' + tenant;
}

function updateActiveNav() {
  const path = window.location.pathname;
  let activeId = 'home';
  if (path.includes('yoga.html') || path.includes('secuencia-yoga.html')) activeId = 'yoga';
  if (path.includes('astro.html') || path.includes('secuencia-astro.html')) activeId = 'astro';
  if (path.includes('oracle.html')) activeId = 'oracle';
  if (path.includes('breath.html')) activeId = 'breath';
  
  SCREENS.forEach(s=>{
    const ni=document.getElementById('nav-'+s);
    if(ni) ni.classList.toggle('active', s===activeId);
  });
}
document.addEventListener('DOMContentLoaded', updateActiveNav);

/* ══ MOON BAR ══ */
(function(){
  const DAYS=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const MOONS=['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  const d=new Date(), day=DAYS[d.getDay()];
  const moonIdx=Math.floor((d.getDate()%8));
  const PLANETS_DAY=['Luna','Sol','Marte','Mercurio','Júpiter','Venus','Saturno'];
  const planet=PLANETS_DAY[d.getDay()];
  const mb = document.getElementById('moonBar');
  if(mb) mb.textContent=`${MOONS[moonIdx]} ${day} · Planeta: ${planet}`;
})();

/* ══ CHIP SELECTOR ══ */
function initChips(container){
  container.querySelectorAll('.sel-chip').forEach(c=>{
    c.addEventListener('click',()=>{
      const g=c.dataset.g;
      container.querySelectorAll(`.sel-chip[data-g="${g}"]`).forEach(x=>x.classList.remove('sel'));
      c.classList.add('sel');
    });
  });
}
document.querySelectorAll('.card').forEach(initChips);
function getChipVal(g){ const el=document.querySelector(`.sel-chip.sel[data-g="${g}"]`); return el?el.dataset.v:null; }

function initDolorMemory() {
  const lastDolor = localStorage.getItem('lastYogaDolor');
  if (lastDolor && lastDolor !== 'ninguna') {
    const lbl = document.getElementById('yoga-dolor-lbl');
    if (lbl) {
      lbl.textContent = `¿Sigues sintiendo molestia en ${lastDolor}?`;
    }
    const container = document.getElementById('yoga-dolor');
    if (container) {
      container.querySelectorAll('.sel-chip').forEach(x => x.classList.remove('sel'));
      const chip = container.querySelector(`.sel-chip[data-v="${lastDolor}"]`);
      if (chip) chip.classList.add('sel');
    }
  }
}
document.addEventListener('DOMContentLoaded', initDolorMemory);

/* ══ AUDIO ══ */
const AudioCtx=window.AudioContext||window.webkitAudioContext;
let actx=null;
let audioOn=true;
function getCtx(){ if(!actx) actx=new AudioCtx(); return actx; }
function tone(freq,dur,vol=0.15){
  if(!audioOn) return;
  try{
    const c=getCtx(),o=c.createOscillator(),g=c.createGain();
    o.connect(g);g.connect(c.destination);
    o.type='sine';o.frequency.value=freq;
    g.gain.setValueAtTime(0,c.currentTime);
    g.gain.linearRampToValueAtTime(vol,c.currentTime+0.08);
    g.gain.linearRampToValueAtTime(0,c.currentTime+dur);
    o.start();o.stop(c.currentTime+dur+0.1);
  }catch(e){}
}
function bell(){ tone(528,1.5,0.18); setTimeout(()=>tone(639,1,0.12),600); }
function posturaBell(){ tone(432,0.6,0.2); setTimeout(()=>tone(528,0.4,0.12),350); }

const audioTog = document.getElementById('audioToggle');
if(audioTog){
  audioTog.addEventListener('click',()=>{
    audioOn=!audioOn;
    audioTog.classList.toggle('on',audioOn);
  });
}

/* ══ ASTRO DATA ══ */
const SIGNS=[{n:'Aries',s:'♈',e:'Fuego'},{n:'Tauro',s:'♉',e:'Tierra'},{n:'Géminis',s:'♊',e:'Aire'},{n:'Cáncer',s:'♋',e:'Agua'},{n:'Leo',s:'♌',e:'Fuego'},{n:'Virgo',s:'♍',e:'Tierra'},{n:'Libra',s:'♎',e:'Aire'},{n:'Escorpio',s:'♏',e:'Agua'},{n:'Sagitario',s:'♐',e:'Fuego'},{n:'Capricornio',s:'♑',e:'Tierra'},{n:'Acuario',s:'♒',e:'Aire'},{n:'Piscis',s:'♓',e:'Agua'}];
const PLANETS=[{n:'Sol',s:'☀',d:0},{n:'Luna',s:'☽',d:1},{n:'Marte',s:'♂',d:2},{n:'Mercurio',s:'☿',d:3},{n:'Júpiter',s:'♃',d:4},{n:'Venus',s:'♀',d:5},{n:'Saturno',s:'♄',d:6},{n:'Urano',s:'⛢',d:null},{n:'Neptuno',s:'♆',d:null},{n:'Plutón',s:'♇',d:null}];
const HOUSES=[{n:'Casa I',desc:'Identidad'},{n:'Casa II',desc:'Recursos'},{n:'Casa III',desc:'Comunicación'},{n:'Casa IV',desc:'Hogar'},{n:'Casa V',desc:'Creatividad'},{n:'Casa VI',desc:'Salud'},{n:'Casa VII',desc:'Relaciones'},{n:'Casa VIII',desc:'Transformación'},{n:'Casa IX',desc:'Expansión'},{n:'Casa X',desc:'Vocación'},{n:'Casa XI',desc:'Comunidad'},{n:'Casa XII',desc:'Inconsciente'}];

const dow=new Date().getDay();
const todayP=PLANETS.find(p=>p.d===dow);
let selSign=null,selPlanet=null,selHouse=null;

function buildAstroSelectors(){
  const sg=document.getElementById('astro-signs');
  if(!sg) return; // Salir si no estamos en la página de astro
  
  // Signs
  SIGNS.forEach(item=>{
    const b=document.createElement('button');
    b.className='abtn';
    b.innerHTML=`<span class="sym">${item.s}</span><span class="nm">${item.n}</span>`;
    b.onclick=()=>{ sg.querySelectorAll('.abtn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); selSign=item; };
    sg.appendChild(b);
  });
  // Planets
  const pg=document.getElementById('astro-planets');
  PLANETS.forEach(item=>{
    const isToday = item===todayP;
    const b=document.createElement('button');
    b.className='abtn' + (isToday ? ' active today-p' : '');
    if (isToday) selPlanet = item; // Seleccionado por defecto
    
    const pip=isToday?'<span class="today-pip">hoy</span>':'';
    b.innerHTML=`<span class="sym">${item.s}</span><span class="nm">${item.n}${pip}</span>`;
    b.onclick=()=>{ pg.querySelectorAll('.abtn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); selPlanet=item; };
    pg.appendChild(b);
  });
  // Houses
  const hg=document.getElementById('astro-houses');
  HOUSES.forEach(item=>{
    const b=document.createElement('button');
    b.className='abtn';
    b.innerHTML=`<span class="sym" style="font-size:.75rem;font-weight:500">${item.n}</span><span class="nm">${item.desc}</span>`;
    b.onclick=()=>{ hg.querySelectorAll('.abtn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); selHouse=item; };
    hg.appendChild(b);
  });
  // Init dur chips
  initChips(document.getElementById('screen-astro'));
}
buildAstroSelectors();

/* ══ GEMINI API (CONEXIÓN SEGURA VERCEL + RESPALDO) ══ */
async function callGemini(prompt, retry=true){
  // 1. En Vercel: intentar llamar a la función serverless segura (/api/gemini)
  if (window.location.protocol.startsWith('http')) {
    try {
      const vRes = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (vRes.ok) {
        const vData = await vRes.json();
        if (vData.result) return vData.result;
      } else if (vRes.status !== 404) {
        const vData = await vRes.json().catch(() => ({}));
        if (vData.error) throw new Error(vData.error);
      }
    } catch (err) {
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('404')) {
        throw err;
      }
    }
  }

  // 2. Respaldo local: si se ejecuta abriendo el archivo HTML directamente (file://)
  let apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    apiKey = window.prompt("Para generar secuencias en local, ingresa tu API Key de Google AI Studio (Gemini).\nEn Vercel esto se realiza automáticamente sin pedir clave:");
    if (!apiKey) throw new Error("API Key requerida para conectar con la inteligencia artificial.");
    localStorage.setItem('gemini_api_key', apiKey.trim());
  }

  const payload = {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body:JSON.stringify({
      contents: [{ parts: [{text: prompt}] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  };

  let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  let res=await fetch(url, payload);
  let data=await res.json();
  
  // Respaldo con Gemini 2.0 si 2.5 está saturado
  if (data.error && data.error.message && data.error.message.includes('high demand') && retry) {
    console.warn("Gemini 2.5 saturado. Intentando con Gemini 2.0 de respaldo...");
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    res = await fetch(url, payload);
    data = await res.json();
  }
  if(data.error) {
    if(data.error.code === 400 || data.error.code === 403) {
      localStorage.removeItem('gemini_api_key');
      throw new Error("La API Key es inválida. Recarga la página e intenta de nuevo.");
    }
    throw new Error("Error de API: " + data.error.message);
  }
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    const reason = data.candidates && data.candidates[0] ? data.candidates[0].finishReason : "desconocida";
    throw new Error("La inteligencia artificial no pudo generar la respuesta (razón: " + reason + "). Por favor intenta de nuevo.");
  }
  
  let textContent = data.candidates[0].content.parts[0].text;
  
  const start = textContent.indexOf('{');
  const end = textContent.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    textContent = textContent.substring(start, end + 1);
  }
  
  return textContent.trim();
}

/* ══ SEQUENCE RENDERER ══ */
let ySeq=[],yCur=0,yTime=0,yTotal=0,yPlaying=false,yIv=null;

function renderSequence(data, containerId, timerPrefix){
  const seq=[];
  const PCOLORS=['rgba(127,119,221,0.4)','rgba(201,169,110,0.4)','rgba(180,127,207,0.4)','rgba(127,180,170,0.4)','rgba(180,127,127,0.4)'];
  let html=`<div class="seq-header"><div class="seq-title">${data.titulo}</div><div class="seq-meta" id="${timerPrefix}-meta"></div></div>`;
  data.fases.forEach((fase,fi)=>{
    html+=`<span class="phase-lbl">${fase.nombre}</span>`;
    fase.asanas.forEach(a=>{
      seq.push({...a, fase:fase.nombre});
      const m=Math.floor(a.duracion_seg/60),sc=a.duracion_seg%60;
      const ts=m>0?m+'m'+(sc?' '+sc+'s':''):sc+'s';
      html+=`<div class="asana-card" style="border-left:2px solid ${PCOLORS[fi%PCOLORS.length]}">
        <div class="asana-top">
          <span class="asana-ico">${a.icono||'🧘'}</span>
          <div style="flex:1"><div class="asana-skt">${a.sanskrit}</div><div class="asana-esp">${a.español}</div></div>
          <span class="asana-t">⏱ ${ts}</span>
        </div>
        <div class="asana-tags">
          <span class="tag tc">◉ ${a.chakra||''}</span>
          <span class="tag tp">${a.planeta_asoc||''}</span>
        </div>
        <div class="breath-hint">🌬 ${a.respiracion||''}</div>
      </div>`;
    });
  });
  if(data.afirmacion) html+=`<div class="affirm"><div class="affirm-lbl">Afirmación de cierre</div><div class="affirm-txt">"${data.afirmacion}"</div></div>`;
  document.getElementById(containerId).innerHTML=html;
  return seq;
}

function fmtTime(s){ return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }

function updateTimerUI(seq,cur,prefix){
  if(!seq.length) return;
  const p=seq[cur];
  document.getElementById(prefix+'-tpose').textContent=(p.icono||'🧘')+' '+p.sanskrit+' — '+p.español;
  yTotal=p.duracion_seg; yTime=yTotal;
  document.getElementById(prefix+'-tnum').textContent=fmtTime(yTime);
  document.getElementById(prefix+'-tbar').style.width='0%';
  document.getElementById(prefix+'-tcnt').textContent='Pose '+(cur+1)+' de '+seq.length+' · '+p.fase;
}

/* ── YOGA ── */
async function generateYoga(){
  const estilo=getChipVal('estilo'), nivel=getChipVal('nivel'), dur=getChipVal('dur'), enfoque=getChipVal('enfoque'), dolor=getChipVal('dolor')||'ninguna';
  const bloqueo=document.getElementById('yoga-bloqueo').value.trim();
  document.getElementById('yoga-loading').classList.add('on');
  document.getElementById('yoga-gen-btn').disabled=true;
  document.getElementById('yoga-error').innerHTML='';
  try{
    let prompt=`Diseña una secuencia de yoga terapéutica de ${dur} minutos, estilo ${estilo}, nivel ${nivel}, enfoque ${enfoque}. `;
    if(dolor !== 'ninguna') prompt += `El usuario reporta dolor o lesión en: ${dolor}. Evita posturas de riesgo para esa zona y prioriza asanas de alivio. `;
    if(bloqueo) prompt += `El usuario reporta el siguiente bloqueo: "${bloqueo}". Selecciona posturas que ayuden a liberar esa energía específica. `;
    prompt += `Para cada asana asimétrica, indica explícitamente en la descripción ("español") que debe realizarse primero del lado derecho y luego repetir del lado izquierdo. La última fase SIEMPRE es Meditación final (al menos 5 min para 30min, 10 min para 60min). Responde SOLO con JSON válido sin backticks. Estructura: {"titulo":"string","afirmacion":"string","fases":[{"nombre":"string","asanas":[{"sanskrit":"string","español":"string","icono":"emoji","duracion_seg":number,"chakra":"string","planeta_asoc":"string","respiracion":"string"}]}]}. Usa fases: Pranayama, Calentamiento, Poses activas, Restaurativas, Meditación final. La suma de duracion_seg debe ser exactamente ${dur*60}.`;
    const txt=await callGemini(prompt);
    const data=JSON.parse(txt);
    
    // Guardar dolor para la advertencia y memoria local
    data.dolor_reportado = dolor;
    localStorage.setItem('lastYogaDolor', dolor);

    // Generar un ID único para asegurar que siempre se guarde individualmente
    data.uid = 'yoga-' + Date.now();
    
    // Guardar en sessionStorage
    sessionStorage.setItem('currentYogaSequence', JSON.stringify(data));
    
    // Redirigir a la nueva página
    goTo('secuencia-yoga');
  }catch(e){
    document.getElementById('yoga-error').innerHTML=`<div class="errmsg">Error: ${e.message}</div>`;
    document.getElementById('yoga-loading').classList.remove('on');
    document.getElementById('yoga-gen-btn').disabled=false;
  }
}

/* ── SECUENCIA YOGA PAGE ── */
function initSecuenciaYoga() {
  if (!window.location.pathname.includes('secuencia-yoga.html')) return;
  
  const rawData = sessionStorage.getItem('currentYogaSequence');
  if (!rawData) {
    document.getElementById('yoga-seq').innerHTML = '<div class="errmsg" style="text-align:center;">No hay secuencia generada. Por favor, vuelve al generador.</div>';
    const loader = document.getElementById('seq-loading');
    if (loader) loader.style.display = 'none';
    return;
  }
  
  try {
    const data = JSON.parse(rawData);
    ySeq = renderSequence(data, 'yoga-seq', 't'); // usamos 't' para el prefijo de meta
    const loader = document.getElementById('seq-loading');
    if (loader) loader.style.display = 'none';
    
    // Mostrar advertencia de seguridad si reportó dolor
    const warning = document.getElementById('yoga-warning');
    if (warning && data.dolor_reportado && data.dolor_reportado !== 'ninguna') {
      warning.textContent = `⚠️ Secuencia adaptada para aliviar tu molestia en ${data.dolor_reportado}. Recuerda no forzar la postura.`;
      warning.style.display = 'block';
    }

    document.getElementById('seq-actions').style.display = 'flex';
    
    yCur = 0; yPlaying = false;
    updateTrainingUI(yCur);
    
    // Check si es favorito
    checkIsFavorite('yoga', data);
  } catch(e) {
    document.getElementById('yoga-seq').innerHTML = '<div class="errmsg">Error al cargar secuencia: ' + e.message + '</div>';
    const loader = document.getElementById('seq-loading');
    if (loader) loader.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', initSecuenciaYoga);

function updateTrainingUI(cur) {
  if(!ySeq.length) return;
  const p = ySeq[cur];
  document.getElementById('t-fase').textContent = p.fase || 'Fase actual';
  document.getElementById('t-pose').textContent = p.sanskrit || '';
  document.getElementById('t-pose-es').textContent = p.español || '';
  
  yTotal = p.duracion_seg; yTime = yTotal;
  document.getElementById('t-num').textContent = fmtTime(yTime);
  document.getElementById('t-bar').style.width = '0%';
  document.getElementById('t-cnt').textContent = 'Pose '+(cur+1)+' de '+ySeq.length;
}

function openTrainingMode() {
  document.getElementById('training-overlay').classList.add('active');
  yCur = 0; yPlaying = false;
  updateTrainingUI(yCur);
  document.getElementById('t-playbtn').textContent = '▶ Iniciar';
}

function closeTrainingMode() {
  document.getElementById('training-overlay').classList.remove('active');
  clearInterval(yIv);
  yPlaying = false;
  if(droneOn) toggleMusic(); // Apagar música al salir
}

function yogaToggle() {
  yPlaying = !yPlaying;
  const btn = document.getElementById('t-playbtn');
  btn.textContent = yPlaying ? '⏸ Pausar' : '▶ Iniciar';
  if(yPlaying) {
    // Si no está el contexto de audio activado, lo activamos
    getCtx().resume();
    
    yIv = setInterval(() => {
      if(yTime > 0) { 
        yTime--; 
        document.getElementById('t-num').textContent = fmtTime(yTime); 
        const pct = ((yTotal - yTime) / yTotal) * 100; 
        document.getElementById('t-bar').style.width = pct + '%'; 
      } else {
        posturaBell();
        if(yCur < ySeq.length - 1) { 
          yCur++; 
          updateTrainingUI(yCur); 
        } else { 
          clearInterval(yIv);
          yPlaying = false; 
          btn.textContent = '✓ Completado'; 
          bell(); 
        }
      }
    }, 1000);
  } else clearInterval(yIv);
}

/* ── HOLISTIC MUSIC (TIBETAN SINGING BOWLS GENERATOR) ── */
let droneOn = false;
let dOscs = [], dGain, bowlInterval;

function playBowlStrike(c, baseFreq, vol, isContinuous=false) {
  const t = c.currentTime;
  const dur = isContinuous ? 9999 : 14; 
  
  const strikeGain = c.createGain();
  strikeGain.connect(dGain);
  
  if (isContinuous) {
    strikeGain.gain.setValueAtTime(0, t);
    strikeGain.gain.linearRampToValueAtTime(vol, t + 4);
  } else {
    strikeGain.gain.setValueAtTime(0, t);
    strikeGain.gain.linearRampToValueAtTime(vol, t + 0.5); // Golpe suave del mazo
    strikeGain.gain.exponentialRampToValueAtTime(0.001, t + dur); // Eco largo y resonante
  }
  
  // Parciales armónicos que le dan el timbre metálico de un cuenco tibetano
  const partials = [
    { f: 1, a: 1.0 },
    { f: 2.76, a: 0.5 },
    { f: 5.4, a: 0.2 },
    { f: 8.9, a: 0.05 }
  ];
  
  partials.forEach(p => {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = baseFreq * p.f;
    
    // Oscilador ligeramente desafinado para crear el efecto de "latido" (wawawa)
    const oscBeat = c.createOscillator();
    oscBeat.type = 'sine';
    oscBeat.frequency.value = (baseFreq * p.f) + (1.2 * p.f); 
    
    const pGain = c.createGain();
    pGain.gain.value = p.a / partials.length;
    
    osc.connect(pGain);
    oscBeat.connect(pGain);
    pGain.connect(strikeGain);
    
    osc.start(t);
    oscBeat.start(t);
    dOscs.push(osc, oscBeat);
    
    if (!isContinuous) {
      osc.stop(t + dur);
      oscBeat.stop(t + dur);
    }
  });
}

function toggleMusic() {
  droneOn = !droneOn;
  const btn = document.getElementById('music-btn');
  if(btn) btn.style.opacity = droneOn ? '1' : '0.4';
  
  const c = getCtx();
  if(droneOn) {
    c.resume();
    dGain = c.createGain();
    dGain.gain.setValueAtTime(1, c.currentTime);
    dGain.connect(c.destination);
    
    dOscs = [];
    
    // Cuenco base continuo (Fricción en el borde - Frecuencia 174Hz)
    playBowlStrike(c, 174, 0.12, true);
    // Golpe inicial profundo
    playBowlStrike(c, 174, 0.35, false);
    
    // Golpes esporádicos de cuencos de diferentes tamaños (Frecuencias Solfeggio)
    bowlInterval = setInterval(() => {
      const freqs = [174, 285, 396, 417];
      const f = freqs[Math.floor(Math.random() * freqs.length)];
      playBowlStrike(c, f, 0.15 + Math.random()*0.15, false);
    }, 12000); // Cada 12 segundos
    
  } else {
    clearInterval(bowlInterval);
    if(dGain) {
      dGain.gain.linearRampToValueAtTime(0, c.currentTime + 3);
      setTimeout(() => { 
        dOscs.forEach(o => { try{ o.stop(); }catch(e){} });
        dOscs = [];
      }, 3500);
    }
  }
}

function yogaPrev() { clearInterval(yIv); yPlaying = false; if(yCur > 0) { yCur--; updateTrainingUI(yCur); document.getElementById('t-playbtn').textContent = '▶ Iniciar'; } }
function yogaNext() { clearInterval(yIv); yPlaying = false; if(yCur < ySeq.length - 1) { yCur++; updateTrainingUI(yCur); document.getElementById('t-playbtn').textContent = '▶ Iniciar'; } }

function downloadYogaPDF() {
  // Forzar el scroll arriba para evitar el bug de página en blanco en html2canvas
  window.scrollTo(0, 0);
  
  const element = document.getElementById('pdf-content');
  
  // Guardamos el estilo actual para restaurarlo después
  const originalBg = element.style.background;
  const originalPadding = element.style.padding;
  const originalOverflow = document.body.style.overflowX;
  
  // Deshabilitar overflow en body que causa que html2canvas mida mal la altura
  document.body.style.overflowX = 'visible';
  
  // Le damos un fondo sólido oscuro al contenedor para que el texto blanco sea visible en el PDF
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#231f33';
  element.style.background = bgColor;
  element.style.padding = '20px';
  
  const opt = {
    margin:       10,
    filename:     'mi-secuencia-yoga.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: bgColor, 
      scrollY: 0,
      windowHeight: element.scrollHeight + 200 // Asegura que lea todo el alto del contenedor
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };
  
  html2pdf().set(opt).from(element).save().then(() => {
    // Restauramos el estilo
    element.style.background = originalBg;
    element.style.padding = originalPadding;
    document.body.style.overflowX = originalOverflow;
  });
}

/* ── YOGA ASTROLÓGICO ── */
let aSeq=[],aCur=0,aTime=0,aTotal=0,aPlaying=false,aIv=null;

async function generateAstro(){
  if(!selSign||!selPlanet||!selHouse){ document.getElementById('astro-error').innerHTML='<div class="errmsg">Selecciona signo, planeta y casa.</div>'; return; }
  const dur=getChipVal('adur')||'20';
  const dolor=getChipVal('dolor')||'ninguna';
  const bloqueo=document.getElementById('astro-bloqueo') ? document.getElementById('astro-bloqueo').value.trim() : '';
  document.getElementById('astro-loading').classList.add('on');
  document.getElementById('astro-gen-btn').disabled=true;
  document.getElementById('astro-error').innerHTML='';
  try{
    let prompt=`Diseña una secuencia de yoga terapéutica astrológica de ${dur} minutos para: Signo ${selSign.n} (${selSign.e}), Planeta ${selPlanet.n}, ${selHouse.n} (${selHouse.desc}). `;
    if(dolor !== 'ninguna') prompt += `El usuario reporta dolor o lesión en: ${dolor}. Evita posturas de riesgo para esa zona y prioriza asanas de alivio. `;
    if(bloqueo) prompt += `El usuario reporta el siguiente bloqueo: "${bloqueo}". Selecciona posturas que ayuden a liberar esa energía específica. `;
    prompt += `Para cada asana asimétrica, indica explícitamente en la descripción ("español") que debe realizarse primero del lado derecho y luego repetir del lado izquierdo. La última fase SIEMPRE es Meditación final temática según el planeta (mínimo 5 min). Responde SOLO con JSON válido sin backticks. Estructura: {"titulo":"string","afirmacion":"string","fases":[{"nombre":"string","asanas":[{"sanskrit":"string","español":"string","icono":"emoji","duracion_seg":number,"chakra":"string","planeta_asoc":"string","respiracion":"string"}]}]}. Usa 5 fases: Apertura, Calentamiento, Poses activas, Restaurativas, Meditación final. La suma de duracion_seg debe ser exactamente ${dur*60}.`;
    const txt=await callGemini(prompt);
    const data=JSON.parse(txt);
    
    // Guardar dolor para la advertencia y memoria local
    data.dolor_reportado = dolor;
    localStorage.setItem('lastYogaDolor', dolor);

    // Generar un ID único para asegurar que siempre se guarde individualmente
    data.uid = 'astro-' + Date.now();
    
    // Guardar en sessionStorage
    sessionStorage.setItem('currentAstroSequence', JSON.stringify(data));
    
    // Redirigir a la nueva página
    goTo('secuencia-astro');
  }catch(e){
    document.getElementById('astro-error').innerHTML=`<div class="errmsg">Error: ${e.message}</div>`;
    document.getElementById('astro-loading').classList.remove('on');
    document.getElementById('astro-gen-btn').disabled=false;
  }
}

/* ── SECUENCIA ASTRO PAGE ── */
function initSecuenciaAstro() {
  if (!window.location.pathname.includes('secuencia-astro.html')) return;
  
  const rawData = sessionStorage.getItem('currentAstroSequence');
  if (!rawData) {
    document.getElementById('astro-seq').innerHTML = '<div class="errmsg" style="text-align:center;">No hay secuencia astrológica generada. Por favor, vuelve al generador.</div>';
    const loader = document.getElementById('seq-loading-astro');
    if (loader) loader.style.display = 'none';
    return;
  }
  
  try {
    const data = JSON.parse(rawData);
    aSeq = renderSequence(data, 'astro-seq', 'a');
    const loader = document.getElementById('seq-loading-astro');
    if (loader) loader.style.display = 'none';

    // Mostrar advertencia de seguridad si reportó dolor
    const warning = document.getElementById('astro-warning');
    if (warning && data.dolor_reportado && data.dolor_reportado !== 'ninguna') {
      warning.textContent = `⚠️ Secuencia adaptada para aliviar tu molestia en ${data.dolor_reportado}. Recuerda no forzar la postura.`;
      warning.style.display = 'block';
    }

    document.getElementById('seq-actions-astro').style.display = 'flex';
    
    aCur = 0; aPlaying = false;
    updateAstroTrainingUI(aCur);
    
    // Check si es favorito
    checkIsFavorite('astro', data);
  } catch(e) {
    document.getElementById('astro-seq').innerHTML = '<div class="errmsg">Error al cargar secuencia: ' + e.message + '</div>';
    const loader = document.getElementById('seq-loading-astro');
    if (loader) loader.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', initSecuenciaAstro);

function updateAstroTrainingUI(cur) {
  if(!aSeq.length) return;
  const p = aSeq[cur];
  document.getElementById('a-fase').textContent = p.fase || 'Fase actual';
  document.getElementById('a-pose').textContent = p.sanskrit || '';
  document.getElementById('a-pose-es').textContent = p.español || '';
  
  aTotal = p.duracion_seg; aTime = aTotal;
  document.getElementById('a-num').textContent = fmtTime(aTime);
  document.getElementById('a-bar').style.width = '0%';
  document.getElementById('a-cnt').textContent = 'Pose '+(cur+1)+' de '+aSeq.length;
}

function openAstroTrainingMode() {
  document.getElementById('training-overlay-astro').classList.add('active');
  aCur = 0; aPlaying = false;
  updateAstroTrainingUI(aCur);
  document.getElementById('a-playbtn').textContent = '▶ Iniciar';
}

function closeAstroTrainingMode() {
  document.getElementById('training-overlay-astro').classList.remove('active');
  clearInterval(aIv);
  aPlaying = false;
  if(droneOn) toggleMusic();
}


function astroToggle() {
  aPlaying = !aPlaying;
  const btn = document.getElementById('a-playbtn');
  btn.textContent = aPlaying ? '⏸ Pausar' : '▶ Iniciar';
  if(aPlaying) {
    getCtx().resume();
    
    aIv = setInterval(() => {
      if(aTime > 0) { 
        aTime--; 
        document.getElementById('a-num').textContent = fmtTime(aTime); 
        const pct = ((aTotal - aTime) / aTotal) * 100; 
        document.getElementById('a-bar').style.width = pct + '%'; 
      } else {
        posturaBell();
        if(aCur < aSeq.length - 1) { 
          aCur++; 
          updateAstroTrainingUI(aCur); 
        } else { 
          clearInterval(aIv);
          aPlaying = false; 
          btn.textContent = '✓ Completado'; 
          bell(); 
        }
      }
    }, 1000);
  } else clearInterval(aIv);
}
function astroPrev() { clearInterval(aIv); aPlaying = false; if(aCur > 0) { aCur--; updateAstroTrainingUI(aCur); document.getElementById('a-playbtn').textContent = '▶ Iniciar'; } }
function astroNext() { clearInterval(aIv); aPlaying = false; if(aCur < aSeq.length - 1) { aCur++; updateAstroTrainingUI(aCur); document.getElementById('a-playbtn').textContent = '▶ Iniciar'; } }

function downloadAstroPDF() {
  window.scrollTo(0, 0);
  const element = document.getElementById('pdf-content-astro');
  
  const originalBg = element.style.background;
  const originalPadding = element.style.padding;
  const originalOverflow = document.body.style.overflowX;
  
  document.body.style.overflowX = 'visible';
  
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#231f33';
  element.style.background = bgColor;
  element.style.padding = '20px';
  
  const opt = {
    margin:       10,
    filename:     'mi-secuencia-astro.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: bgColor, 
      scrollY: 0,
      windowHeight: element.scrollHeight + 200
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };
  
  html2pdf().set(opt).from(element).save().then(() => {
    element.style.background = originalBg;
    element.style.padding = originalPadding;
    document.body.style.overflowX = originalOverflow;
  });
}

/* ── ORÁCULO ── */
let selIntent='claridad', oTipo='1';
document.querySelectorAll('.int-btn').forEach(b=>{
  b.addEventListener('click',()=>{ document.querySelectorAll('.int-btn').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); selIntent=b.dataset.int; });
});
document.querySelectorAll('[data-g="otipo"]').forEach(b=>{
  b.addEventListener('click',()=>{ document.querySelectorAll('[data-g="otipo"]').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); oTipo=b.dataset.v; });
});

const CARD_EMOJIS=['🌙','⭐','☀️','🌊','🔥','🌿','💫','🦋','🌸','🗝️','⚡','🌈'];
const CARD_NAMES=['La Luna','La Estrella','El Sol','Las Aguas','El Fuego','El Jardín','El Destino','La Transformación','El Florecimiento','Las Puertas','El Rayo','El Arco Iris'];

async function generateOracle(){
  const n=parseInt(oTipo);
  document.getElementById('oracle-loading').classList.add('on');
  document.getElementById('oracle-gen-btn').disabled=true;
  document.getElementById('oracle-error').innerHTML='';
  document.getElementById('oracle-result').style.display='none';
  try{
    const tirada=n===1?'1 carta (mensaje del día)':'3 cartas (Pasado, Presente, Futuro)';
    const prompt=`Eres un oráculo de sabiduría ancestral. Genera una tirada de ${tirada} para la intención: "${selIntent}". Responde SOLO con JSON válido sin backticks. Estructura: {"cartas":[{"nombre":"string","posicion":"string","simbolo":"emoji unico","significado":"frase corta poetica","mensaje":"frase de 15-20 palabras inspiradora"}],"mensaje_global":"párrafo de 40-60 palabras de sabiduría profunda y poética para la intención ${selIntent}"}`;
    const txt=await callGemini(prompt);
    const data=JSON.parse(txt);
    renderOracle(data);
  }catch(e){
    document.getElementById('oracle-error').innerHTML=`<div class="errmsg">Error: ${e.message}</div>`;
  }
  document.getElementById('oracle-loading').classList.remove('on');
  document.getElementById('oracle-gen-btn').disabled=false;
}

function renderOracle(data){
  const row=document.getElementById('oracle-cards');
  row.innerHTML='';
  data.cartas.forEach((carta,i)=>{
    const slot=document.createElement('div');
    slot.className='oracle-card-slot';
    slot.innerHTML=`
      <div class="card-back">✦</div>
      <div class="card-inner">
        <div style="font-size:1.6rem">${carta.simbolo||'✦'}</div>
        <div class="card-name">${carta.nombre}</div>
        <div class="card-meaning">${carta.posicion||''}</div>
        <div class="card-meaning" style="margin-top:.2rem">${carta.significado||''}</div>
      </div>`;
    slot.addEventListener('click',()=>{ slot.classList.toggle('revealed'); tone(528,0.8,0.12); });
    row.appendChild(slot);
    setTimeout(()=>slot.classList.add('revealed'),400+(i*300));
  });
  document.getElementById('oracle-msg-txt').textContent=data.mensaje_global||'';
  document.getElementById('oracle-result').style.display='block';
  document.getElementById('oracle-result').scrollIntoView({behavior:'smooth'});
  bell();
}

function resetOracle(){
  document.getElementById('oracle-result').style.display='none';
  document.getElementById('oracle-cards').innerHTML='';
  document.getElementById('oracle-msg-txt').textContent='';
}

/* ── BREATHWORK ── */
const TECHS={
  box:  {name:'Box Breathing',  phases:[{l:'Inhala',e:'🫁',d:4},{l:'Retén',e:'✦',d:4},{l:'Exhala',e:'🌬',d:4},{l:'Retén',e:'✦',d:4}]},
  '478':{name:'4-7-8 Relajante',phases:[{l:'Inhala',e:'🌙',d:4},{l:'Retén',e:'✦',d:7},{l:'Exhala',e:'🌬',d:8}]},
  fuego:{name:'Respiración de Fuego',phases:[{l:'Inhala',e:'🔥',d:1},{l:'Exhala',e:'💨',d:1}]},
  wimhof:{name:'Wim Hof',phases:[{l:'Inhala',e:'❄️',d:2},{l:'Exhala',e:'🌬',d:2}],retEvery:30,retDur:15}
};

let bTech='box',bMin=5;
let bMainIv=null,bPhaseIv=null,bAnimId=null;
let bElapsed=0,bTotal=0,bCycles=0,bPIdx=0,bBreaths=0;

document.querySelectorAll('.tech-card').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.tech-card').forEach(x=>x.classList.remove('selected'));
  c.classList.add('selected'); bTech=c.dataset.tech;
}));
document.querySelectorAll('[data-g="bdur"]').forEach(b=>b.addEventListener('click',()=>bMin=+b.dataset.v));

function startBreath(){
  const t=TECHS[bTech];
  bElapsed=0;bTotal=bMin*60;bCycles=0;bPIdx=0;bBreaths=0;
  document.getElementById('b-techname').textContent=t.name;
  document.getElementById('b-timer').textContent=fmtTime(bTotal);
  document.getElementById('b-progfill').style.width='0%';
  document.getElementById('cycleInfo').textContent='ciclo 1';
  document.getElementById('breath-select').style.display='none';
  document.getElementById('breath-session').style.display='block';
  document.getElementById('breath-done').style.display='none';
  bMainIv=setInterval(()=>{
    bElapsed++;
    document.getElementById('b-timer').textContent=fmtTime(bTotal-bElapsed);
    document.getElementById('b-progfill').style.width=(bElapsed/bTotal*100)+'%';
    if(bElapsed>=bTotal) endBreath(true);
  },1000);
  runBPhase();
}

function runBPhase(){
  const t=TECHS[bTech],ph=t.phases[bPIdx];
  let c=ph.d;
  document.getElementById('phaseLabel').textContent=ph.l;
  document.getElementById('phaseEmoji').textContent=ph.e;
  document.getElementById('phaseCount').textContent=c;
  bChime(ph.l); bAnimTarget(ph.l);
  bPhaseIv=setInterval(()=>{
    c--;document.getElementById('phaseCount').textContent=c;
    if(c<=0){ clearInterval(bPhaseIv); nextBPhase(); }
  },1000);
}

function nextBPhase(){
  const t=TECHS[bTech];
  bPIdx=(bPIdx+1)%t.phases.length;
  if(bPIdx===0){ bCycles++;bBreaths++;document.getElementById('cycleInfo').textContent='ciclo '+(bCycles+1); if(bTech==='wimhof'&&bBreaths%30===0){bRetention();return;} }
  runBPhase();
}

function bRetention(){
  document.getElementById('phaseLabel').textContent='Retención';
  document.getElementById('phaseEmoji').textContent='✦';
  tone(174,2,0.15); bAnimTarget('Retén');
  let r=TECHS.wimhof.retDur; document.getElementById('phaseCount').textContent=r;
  bPhaseIv=setInterval(()=>{r--;document.getElementById('phaseCount').textContent=r;if(r<=0){clearInterval(bPhaseIv);bPIdx=0;runBPhase();}},1000);
}

function bChime(ph){ ph==='Inhala'?tone(528,.4):ph==='Exhala'?tone(264,.5):tone(396,.3); }

function bAnimTarget(label){
  cancelAnimationFrame(bAnimId);
  const tgt=label==='Inhala'?1.28:label==='Exhala'?0.84:1;
  const core=document.getElementById('breathCore');
  const o1=document.getElementById('o1'),o2=document.getElementById('o2'),o3=document.getElementById('o3');
  let cur=parseFloat(core.style.transform?.match(/scale\(([^)]+)\)/)?.[1]||1);
  function step(){
    const d=tgt-cur;if(Math.abs(d)<0.004)cur=tgt;else cur+=d*.07;
    const s=cur.toFixed(3);
    core.style.transform=`scale(${s})`;
    o1.style.transform=`scale(${(1+(cur-1)*.35).toFixed(3)})`;
    o2.style.transform=`scale(${(1+(cur-1)*.6).toFixed(3)})`;
    o3.style.transform=`scale(${(1+(cur-1)*.85).toFixed(3)})`;
    if(Math.abs(tgt-cur)>.004) bAnimId=requestAnimationFrame(step);
  }
  bAnimId=requestAnimationFrame(step);
}

function endBreath(natural){
  clearInterval(bMainIv);clearInterval(bPhaseIv);cancelAnimationFrame(bAnimId);
  document.getElementById('breath-session').style.display='none';
  document.getElementById('breath-done').style.display='block';
  const mins=Math.max(1,Math.round(bElapsed/60));
  document.getElementById('b-donesub').textContent=`${bMin} min de ${TECHS[bTech].name}`;
  document.getElementById('b-cycles').textContent=bCycles;
  document.getElementById('b-time').textContent=mins;
  bell();
}

function resetBreath(){
  document.getElementById('breath-done').style.display='none';
  document.getElementById('breath-select').style.display='block';
}

/* ── FAVORITOS ── */
/* ── FAVORITOS ── */
function getFavs() {
  try {
    const f = JSON.parse(localStorage.getItem('savedSequences') || '[]');
    return Array.isArray(f) ? f : [];
  } catch(e) { return []; }
}

function getFavUid(type, data) {
  if (data.uid) return data.uid;
  return type + '-' + String(data.titulo || Date.now()).replace(/\s+/g,'').toLowerCase();
}

function checkIsFavorite(type, data) {
  const uid = getFavUid(type, data);
  const favs = getFavs();
  const btn = document.getElementById('btn-fav-' + type);
  if(favs.find(f => f.uid === uid)) {
    if(btn) { btn.classList.add('active'); btn.textContent = '❤️'; }
  } else {
    if(btn) { btn.classList.remove('active'); btn.textContent = '🤍'; }
  }
}

function toggleFavorite(type) {
  const sessionKey = type === 'yoga' ? 'currentYogaSequence' : 'currentAstroSequence';
  const rawData = sessionStorage.getItem(sessionKey);
  if(!rawData) return;
  const data = JSON.parse(rawData);
  
  let favs = getFavs();
  const uid = getFavUid(type, data);
  
  const existingIdx = favs.findIndex(f => f.uid === uid);
  const btn = document.getElementById('btn-fav-' + type);
  
  if (existingIdx >= 0) {
    favs.splice(existingIdx, 1);
    if(btn) { btn.classList.remove('active'); btn.textContent = '🤍'; }
  } else {
    let dur = 0;
    if(data.fases) {
      data.fases.forEach(f => {
        if(f.asanas) f.asanas.forEach(a => dur += (a.duracion_seg || 0));
      });
    }
    const newFav = {
      uid: uid,
      type: type,
      title: data.titulo || 'Secuencia guardada',
      duration_min: Math.round(dur / 60),
      date: new Date().toISOString(),
      data: data
    };
    favs.push(newFav);
    if(btn) { btn.classList.add('active'); btn.textContent = '❤️'; }
  }
  
  localStorage.setItem('savedSequences', JSON.stringify(favs));
}

function initFavoritos() {
  if (!window.location.pathname.includes('favoritos.html')) return;
  const list = document.getElementById('favoritos-list');
  if(!list) return;
  
  const favs = getFavs();
  
  if (favs.length === 0) {
    list.innerHTML = '<div class="errmsg" style="text-align:center;">Aún no has guardado ninguna secuencia.</div>';
    return;
  }
  
  let html = '<div class="module-grid" style="display:flex; flex-direction:column; gap:10px; margin-top:1rem;">';
  
  favs.forEach(f => {
    const icon = f.type === 'yoga' ? '🧘' : '✨';
    const typeName = f.type === 'yoga' ? 'Hatha Yoga' : 'Yoga Astrológico';
    const d = new Date(f.date).toLocaleDateString('es-ES', { month:'short', day:'numeric' });
    
    html += `
      <div class="card" style="margin-bottom:0; display:flex; align-items:center; justify-content:space-between; padding: 1rem;">
        <div style="display:flex; align-items:center; gap:15px; cursor:pointer; flex:1;" onclick="openFavorite('${f.uid}')">
          <span style="font-size:2rem; opacity:0.8;">${icon}</span>
          <div>
            <div style="font-family:'Cinzel',serif; font-size:14px; color:var(--text);">${f.title}</div>
            <div style="font-size:12px; color:var(--text2); margin-top:3px;">${typeName} · ${f.duration_min} min · ${d}</div>
          </div>
        </div>
        <button class="tbtn" style="color:#ff4b4b; background:rgba(255,75,75,0.1); border:none; border-radius:8px; padding:8px; min-width:unset;" onclick="deleteFavorite('${f.uid}')">🗑️</button>
      </div>
    `;
  });
  
  html += '</div>';
  list.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', initFavoritos);

function openFavorite(uid) {
  const favs = getFavs();
  const fav = favs.find(f => f.uid === uid);
  if(fav) {
    const sessionKey = fav.type === 'yoga' ? 'currentYogaSequence' : 'currentAstroSequence';
    const targetPage = fav.type === 'yoga' ? 'secuencia-yoga' : 'secuencia-astro';
    sessionStorage.setItem(sessionKey, JSON.stringify(fav.data));
    goTo(targetPage);
  }
}

function deleteFavorite(uid) {
  let favs = getFavs();
  favs = favs.filter(f => f.uid !== uid);
  localStorage.setItem('savedSequences', JSON.stringify(favs));
  initFavoritos();
}
