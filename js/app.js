/* ============================================================
   CUNHADOS VEÍCULOS — lógica (edite apenas js/carros.js)
   ============================================================ */
const preco=(n)=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const wpp=(m)=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;
const ordemBase=()=>[...CARROS].sort((a,b)=>(b.destaque===true)-(a.destaque===true));
const SINGLE = (typeof window!=="undefined" && window.SINGLE_FILE===true);

function loja(){
  document.querySelectorAll("[data-endereco]").forEach(e=>e.textContent=CONFIG.endereco);
  document.querySelectorAll("[data-horario]").forEach(e=>e.textContent=CONFIG.horario);
  document.querySelectorAll("[data-instagram]").forEach(e=>{ e.textContent="@"+CONFIG.instagram; if(e.tagName==="A") e.href="https://instagram.com/"+CONFIG.instagram; });
  document.querySelectorAll("[data-wpp-geral]").forEach(a=>a.href=wpp("Olá! Vim pelo site da Cunhados Veículos e gostaria de mais informações."));
  document.querySelectorAll("[data-wpp-fin]").forEach(a=>{ a.href=wpp("Olá! Quero SIMULAR UM FINANCIAMENTO. Tenho interesse em um carro do site."); a.target="_blank"; });
  document.querySelectorAll("[data-wpp-troca]").forEach(a=>{ a.href=wpp("Olá! Quero AVALIAR MEU CARRO NA TROCA. Posso mandar fotos e os dados?"); a.target="_blank"; });
  const ano=document.getElementById("ano"); if(ano) ano.textContent=new Date().getFullYear();
}

/* ---------------- HERO ---------------- */
function hero(){
  const host=document.getElementById("hero"); if(!host) return;
  const c=ordemBase()[0]; if(!c){ host.style.display="none"; return; }
  host.innerHTML=`
    <div class="hero__in">
      <div>
        <div class="hero__kick"><span class="rule"></span><span class="eyebrow">Estoque · Rondonópolis-MT</span></div>
        <h1 class="hero__title">Mais do que vender carros,<br/><em>realizamos conquistas.</em></h1>
        <p class="hero__desc">Qualidade, procedência e as melhores oportunidades para você dirigir o carro dos seus sonhos.</p>
        <div class="hsearch">
          <input type="search" id="hbusca" placeholder="Buscar marca, modelo ou cor..." aria-label="Buscar veículo" />
          <button class="btn btn--red" id="hgo">Buscar</button>
        </div>
        <div class="hero__chips">
          <span class="chip"><b>${CARROS.length}</b> veículos no pátio</span>
          <span class="chip">Troca <b>aceita</b></span>
          <span class="chip">Entrada <b>facilitada</b></span>
        </div>
      </div>
      <figure class="hero__fig">
        <div class="hero__card" data-ver="${c.id}" style="cursor:pointer">
          <div class="hero__photo">
            <span class="hero__badge">Destaque</span>
            ${c.fotos.length>1?`<span class="hero__photos">📷 ${c.fotos.length}</span>`:""}
            <img src="${c.fotos[0]}" alt="${c.nome}" />
            <div class="hero__meta">
              <div class="hero__name">${c.nome}<span>${[c.ano,c.cambio,c.combustivel].filter(Boolean).join(" · ")}</span></div>
              <div class="hero__price"><small>A partir de</small>${preco(c.preco)}</div>
            </div>
          </div>
        </div>
        <div class="hero__act">
          <button class="btn btn--red" data-ver="${c.id}">Ver ficha técnica</button>
          <a class="btn btn--wpp" target="_blank" rel="noopener" href="${wpp(`Olá! Tenho interesse no ${c.nome} (${preco(c.preco)}) em destaque no site.`)}">WhatsApp</a>
        </div>
      </figure>
    </div>`;
  document.getElementById("hgo").addEventListener("click",()=>{
    document.getElementById("busca").value=document.getElementById("hbusca").value;
    render(); document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
  });
  document.getElementById("hbusca").addEventListener("keydown",e=>{ if(e.key==="Enter") document.getElementById("hgo").click(); });
}

function marcas(){
  const sel=document.getElementById("marca"); if(!sel) return;
  [...new Set(CARROS.map(c=>c.marca).filter(Boolean))].sort()
    .forEach(m=>{ const o=document.createElement("option"); o.value=m; o.textContent=m; sel.appendChild(o); });
}

function card(c){
  const specs=[["Ano",c.ano],["KM",c.km&&c.km!=="—"?c.km:null],["Câmbio",c.cambio],["Combustível",c.combustivel]]
    .filter(([,v])=>v).map(([k,v])=>`<span><i>${k}</i>${v}</span>`).join("");
  return `
    <article class="car" data-id="${c.id}">
      <div class="car__fig">
        ${c.destaque?`<span class="car__badge">Destaque</span>`:""}
        <img src="${c.fotos[0]}" alt="${c.nome}" loading="lazy" />
        ${c.fotos.length>1?`<span class="car__photos">📷 ${c.fotos.length} fotos</span>`:""}
      </div>
      <div class="car__body">
        <h3 class="car__name">${c.nome}</h3>
        <div class="car__brand">${[c.marca,c.motor,c.cor].filter(Boolean).join(" · ")}</div>
        <div class="car__specs">${specs}</div>
        <div class="car__foot">
          <div class="car__price">${preco(c.preco)}</div>
          <div class="car__cta">
            <button class="btn btn--ghost det" data-ver="${c.id}">Ver detalhes</button>
            <a class="btn btn--wpp" target="_blank" rel="noopener" href="${wpp(`Olá! Tenho interesse no ${c.nome} (${preco(c.preco)}) anunciado no site.`)}" onclick="event.stopPropagation()">WhatsApp</a>
          </div>
        </div>
      </div>
    </article>`;
}

function render(){
  const grid=document.getElementById("grid"); if(!grid) return;
  const termo=document.getElementById("busca").value.toLowerCase().trim();
  const mk=document.getElementById("marca").value;
  const ordem=document.getElementById("ordenar").value;
  let lista=CARROS.filter(c=>{
    const txt=[c.nome,c.marca,c.modelo,c.cor,c.combustivel,c.cambio].join(" ").toLowerCase();
    return txt.includes(termo) && (!mk || c.marca===mk);
  });
  if(ordem==="menor") lista.sort((a,b)=>a.preco-b.preco);
  else if(ordem==="maior") lista.sort((a,b)=>b.preco-a.preco);
  else lista.sort((a,b)=>(b.destaque===true)-(a.destaque===true));
  grid.innerHTML=lista.length?lista.map(card).join(""):`<p class="empty">Nenhum veículo encontrado.</p>`;
  document.getElementById("cnt").textContent=String(CARROS.length).padStart(2,"0");
  observar(grid.querySelectorAll(".car"));
}

/* ============================================================
   DETALHE DO VEÍCULO (página dedicada / overlay)
   ============================================================ */
function vdpHTML(c){
  const campos=[["Marca",c.marca],["Ano",c.ano],["Cor",c.cor],["Motor",c.motor],["Combustível",c.combustivel],["Câmbio",c.cambio],["KM",c.km]]
    .filter(([,v])=>v&&v!=="—");
  const itens = c.itens&&c.itens.length
    ? `<div class="itens"><h4>Itens do veículo</h4><ul>${c.itens.map(i=>`<li>${i}</li>`).join("")}</ul></div>` : "";
  return `
  <div class="vdp">
    <div class="vdp__gallery">
      <div class="gal">
        <button class="gal__nav prev" id="prev" aria-label="Anterior">&#10094;</button>
        <img id="gal-img" src="${c.fotos[0]}" alt="${c.nome}" />
        <button class="gal__nav next" id="next" aria-label="Próxima">&#10095;</button>
        <span class="gal__count" id="gal-count"></span>
      </div>
      <div class="thumbs" id="thumbs">${c.fotos.map((f,i)=>`<img src="${f}" data-i="${i}" alt="Foto ${i+1}">`).join("")}</div>
    </div>
    <div class="vdp__sheet">
      <div class="sheet__tag">Ficha técnica</div>
      <h1 class="sheet__name">${c.nome}</h1>
      <p class="sheet__sub">${[c.marca,c.modelo].filter(Boolean).join(" · ")}</p>
      <p class="sheet__price">${preco(c.preco)}</p>
      <div class="sheet__cta">
        <a class="btn btn--wpp" target="_blank" rel="noopener" href="${wpp(`Olá! Tenho interesse no ${c.nome} (${preco(c.preco)}). Pode me passar mais informações?`)}">Tenho interesse</a>
        <a class="btn btn--wppline" target="_blank" rel="noopener" href="${wpp(`Olá! Quero COMPRAR o ${c.nome} (${preco(c.preco)}). Como funciona o pagamento/troca?`)}">Quero comprar</a>
      </div>
      <dl class="specs">${campos.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      ${itens}
    </div>
  </div>`;
}

let fotos=[],gi=0;
function foto(i){
  if(!fotos.length) return;
  gi=(i+fotos.length)%fotos.length;
  const img=document.getElementById("gal-img"); if(img) img.src=fotos[gi];
  const cnt=document.getElementById("gal-count");
  const many=fotos.length>1;
  if(cnt){ cnt.textContent=`${gi+1} / ${fotos.length}`; cnt.style.display=many?"block":"none"; }
  ["prev","next"].forEach(id=>{ const b=document.getElementById(id); if(b) b.style.display=many?"flex":"none"; });
  document.querySelectorAll("#thumbs img").forEach((t,k)=>t.classList.toggle("on",k===gi));
}
function wireGallery(){
  fotos = wireGallery._fotos||[]; gi=0; foto(0);
  const prev=document.getElementById("prev"), next=document.getElementById("next"), thumbs=document.getElementById("thumbs");
  if(prev) prev.onclick=()=>foto(gi-1);
  if(next) next.onclick=()=>foto(gi+1);
  if(thumbs) thumbs.onclick=e=>{ if(e.target.dataset.i!==undefined) foto(Number(e.target.dataset.i)); };
}

/* Decide: página dedicada (multi-arquivo) ou overlay (arquivo único) */
function openDetail(id){
  if(SINGLE){ openOverlay(id); }
  else { window.location.href = "veiculo.html?id="+encodeURIComponent(id); }
}
function openOverlay(id){
  const c=CARROS.find(x=>x.id===id); if(!c) return;
  const ov=document.createElement("div");
  ov.className="detail-overlay";
  ov.innerHTML=`
    <div class="detail-topbar">
      <button class="detail-back" id="detBack">&#10094; Voltar ao estoque</button>
      <span class="detail-brandword">Cunhados Veículos</span>
    </div>
    <div class="detail-scroll"><div class="wrap">${vdpHTML(c)}</div></div>`;
  document.body.appendChild(ov);
  document.body.style.overflow="hidden";
  wireGallery._fotos=c.fotos; wireGallery();
  const close=()=>{ ov.remove(); document.body.style.overflow=""; document.removeEventListener("keydown",onKey); };
  function onKey(e){ if(e.key==="Escape") close(); if(e.key==="ArrowLeft") foto(gi-1); if(e.key==="ArrowRight") foto(gi+1); }
  document.getElementById("detBack").onclick=close;
  document.addEventListener("keydown",onKey);
  window.scrollTo(0,0);
}

/* Página veiculo.html */
function initVeiculo(){
  const host=document.getElementById("vdp"); if(!host) return;
  const id=new URLSearchParams(location.search).get("id");
  const c=CARROS.find(x=>x.id===id)||ordemBase()[0];
  if(!c){ host.innerHTML="<p class='empty'>Veículo não encontrado.</p>"; return; }
  document.title=`${c.nome} · Cunhados Veículos`;
  host.innerHTML=vdpHTML(c);
  wireGallery._fotos=c.fotos; wireGallery();
  document.addEventListener("keydown",e=>{ if(e.key==="ArrowLeft") foto(gi-1); if(e.key==="ArrowRight") foto(gi+1); });
  // dados da loja no header/rodapé da página
  loja();
}

/* ---------------- reveal / intro ---------------- */
let io;
function observar(els){
  if(typeof IntersectionObserver==="undefined"){ els.forEach(e=>e.classList.add("in")); return; }
  if(!io) io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }}),{threshold:.1});
  els.forEach(e=>{ e.classList.add("reveal"); io.observe(e); });
}
function intro(){
  const el=document.getElementById("intro"); if(!el) return;
  const reduce=window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  const done=()=>{ el.classList.add("done"); document.body.classList.remove("loading"); setTimeout(()=>el.remove(),800); };
  reduce?done():setTimeout(done,2000);
}

/* ---------------- init ---------------- */
function init(){
  if(document.getElementById("vdp")){ initVeiculo(); return; }   // página de detalhe
  intro(); loja(); hero(); marcas(); render();
  observar(document.querySelectorAll(".reveal"));
  setTimeout(()=>document.querySelectorAll(".reveal").forEach(e=>e.classList.add("in")),2500);
  document.getElementById("busca").addEventListener("input",render);
  document.getElementById("marca").addEventListener("change",render);
  document.getElementById("ordenar").addEventListener("change",render);
  document.body.addEventListener("click",e=>{
    const ver=e.target.closest("[data-ver]"); if(ver){ openDetail(ver.dataset.ver); return; }
    const car=e.target.closest(".car"); if(car && !e.target.closest("a")) openDetail(car.dataset.id);
  });
}
if(document.readyState!=="loading") init(); else document.addEventListener("DOMContentLoaded",init);
