/* Four useful destinations, presented as an airy, material-led sphere gallery. */
const STUDIO_FEATURES=[
 {id:'history',number:'01',label:'History',description:'Meet the village, the makers, and six chapters of a living craft.',href:'HistoryPage.html',color:'#f1cec4',theme:'coral'},
 {id:'symbols',number:'02',label:'Art & Symbols',description:'Look closer at three paintings and the stories in their details.',href:'ExplorePage.html',color:'#d6dce3',theme:'lavender'},
 {id:'create',number:'03',label:'Create',description:'Draw something entirely your own, with a little guidance if you like.',href:'WorkshopPage.html#create=free',color:'#c5ded0',theme:'jade'},
 {id:'gallery',number:'04',label:'My Gallery',description:'Revisit your artwork, save an image, and reflect on what you discovered.',href:'ExhibitionPage.html',color:'#efddad',theme:'gold'}
];
function featureObject(id){
 if(id==='history')return `<div class="orb-village">${village}<div class="orb-block"><img src="assets/mouse.svg" alt="" width="900" height="600"></div></div>`;
 if(id==='symbols')return `<div class="orb-artwork"><img src="assets/mouse-wedding-detail.jpg" alt="" width="330" height="224" decoding="async"></div>`;
 if(id==='create')return `<svg class="orb-brushwork" viewBox="0 0 300 300" aria-hidden="true"><defs><linearGradient id="brush-wood" x2="1" y2="1"><stop stop-color="#e7d0a3"/><stop offset="1" stop-color="#b88562"/></linearGradient></defs><path d="M45 200q5-87 82-82q62 5 45 68q-10 41-69 32q-57-12-16-55q45-40 92 22q44 54 85-11" fill="none" stroke="#297c68" stroke-width="22" stroke-linecap="round"/><path d="M49 202q11-75 75-72q54 4 36 52" fill="none" stroke="#75b99b" stroke-width="5" stroke-linecap="round" opacity=".8"/><g transform="rotate(34 167 124)"><path d="M157 30q10-15 20 0l-3 139h-15z" fill="url(#brush-wood)" stroke="#a07961" stroke-width="1.5"/><path d="M158 150h17v24h-17z" fill="#b6b5ac"/><path d="M159 171q-5 25-18 39q29 5 40-10q5-15-8-29z" fill="#423746"/><path d="M147 206q20-1 26-16" fill="none" stroke="#b28386" stroke-width="4"/></g><circle cx="66" cy="74" r="19" fill="#d75f4e"/><circle cx="234" cy="221" r="14" fill="#e9b144"/><circle cx="212" cy="69" r="7" fill="#fff6df"/></svg>`;
 return `<div class="orb-exhibit"><div class="orb-frame"><img src="assets/pigs.svg" alt="" width="900" height="600"></div><div class="orb-gallery-label"><i></i><span>YOUR NEXT<br>IMPRESSION</span></div></div>`;
}
function home(){return `<main id="main" class="gateway-home"><section class="gateway-intro wrap"><div class="gateway-kicker"><span><i></i> A living Vietnamese tradition</span><span>Dong Ho / Bac Ninh, Vietnam</span></div><div class="gateway-title-row"><h1>A living tradition.<br><span>Your way in.</span></h1><div class="gateway-welcome"><p>Discover the stories, symbols, and craft of Dong Ho. Then create a story of your own.</p><span>Four ways to begin. Follow your curiosity.</span><button id="motion-toggle" class="motion-toggle" aria-pressed="false">Ⅱ Pause motion</button></div></div></section><section class="gateway-scene wrap" aria-label="Choose a studio experience"><div class="gateway-atmosphere" aria-hidden="true"><span class="atmosphere-ring"></span><span class="gateway-wordmark">DONG HO</span><i class="gateway-pearl pearl-lilac"></i><i class="gateway-pearl pearl-amber"></i></div><div class="gateway-features">${STUDIO_FEATURES.map(f=>`<a class="gateway-feature feature-${f.id}" id="feature-${f.id}" data-feature="${f.id}" data-transition-color="${f.color}" href="${f.href}" aria-label="${f.label}" aria-describedby="feature-description-${f.id}"><span class="gateway-sphere sphere-${f.theme}"><span class="sphere-content" aria-hidden="true">${featureObject(f.id)}</span><span class="gateway-glass" aria-hidden="true"></span><span class="gateway-reflection" aria-hidden="true"></span><span class="sphere-rim" aria-hidden="true"></span></span><span class="gateway-shadow" aria-hidden="true"></span><span class="gateway-label"><span class="gateway-number">${f.number}</span><strong>${f.label}</strong><span class="gateway-arrow" aria-hidden="true">↗</span></span><span id="feature-description-${f.id}" class="gateway-description">${f.description}</span></a>`).join('')}</div></section><div class="wrap gateway-scene-footer"><span><span aria-hidden="true">✳</span> Choose a bubble. Open a new part of the story.</span><a class="gateway-text-link" href="HistoryPage.html">Begin with the history <span aria-hidden="true">→</span></a></div>${window.HomePrintStory?.html()||''}<section class="wrap gateway-note"><span class="gateway-note-label">ROOTED IN A PLACE.<br>KEPT ALIVE BY PEOPLE.</span><p>From a village workshop to your own blank sheet, this is an invitation to look, learn, and make. Discover the skill behind every impression—and the people carrying it forward.</p><a href="HistoryPage.html" class="gateway-note-link">Meet the tradition <span aria-hidden="true">↗</span></a></section><p class="wrap gateway-reconstruction">The Art &amp; Symbols sphere shows a detail of Mouse Wedding, photographed by Daderot at the Vietnam National Museum of Fine Arts (CC0). The village, woodblock, brush, and gallery scenes are contemporary illustrations. <a href="#home-artwork-credit">Artwork &amp; process credits</a>.</p></main>`;}
let disposeModernHome = () => {};
function bindModernHome(){
 disposeModernHome();
 $$('[data-feature]').forEach(link=>link.onclick=event=>openGatewayFeature(event,link));
 const motion=$('#motion-toggle'),scene=$('.gateway-features');
 const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 const fine=window.matchMedia?.('(pointer:fine)');
 let frame=0;
 const resetPointer=()=>{if(frame)window.cancelAnimationFrame?.(frame);frame=0;scene.style.setProperty('--gateway-x','0px');scene.style.setProperty('--gateway-y','0px');};
 const setMotion=()=>{
  const reduced=!!media?.matches,paused=safeGet('dongho-motion-paused',false);
  document.body.classList.toggle('motion-paused',paused||reduced);
  motion.setAttribute('aria-pressed',String(paused||reduced));
  motion.setAttribute('aria-disabled',String(reduced));
  motion.textContent=reduced?'Motion reduced by your device':paused?'▷ Resume motion':'Ⅱ Pause motion';
  if(paused||reduced){resetPointer();if(gatewayNavigation){const destination=gatewayNavigation.destination;resetGatewayTransition();if(destination)window.location.assign(destination);}}
  window.HomePrintStory?.setMotion(paused||reduced);
 };
 motion.onclick=()=>{if(media?.matches)return;save('dongho-motion-paused',!safeGet('dongho-motion-paused',false));setMotion();};
 media?.addEventListener?.('change',setMotion);
 scene.onpointermove=event=>{
  if(!fine?.matches||document.body.classList.contains('motion-paused')||frame)return;
  frame=window.requestAnimationFrame(()=>{
   frame=0;if(document.body.classList.contains('motion-paused'))return;
   const r=scene.getBoundingClientRect();
   scene.style.setProperty('--gateway-x',((event.clientX-r.left)/r.width-.5)*6+'px');
   scene.style.setProperty('--gateway-y',((event.clientY-r.top)/r.height-.5)*4+'px');
  });
 };
 scene.onpointerleave=resetPointer;
 window.HomePrintStory?.mount();setMotion();
 disposeModernHome=()=>{resetPointer();media?.removeEventListener?.('change',setMotion);scene.onpointermove=null;scene.onpointerleave=null;motion.onclick=null;window.HomePrintStory?.destroy();};
 try{const target=new URLSearchParams(location.hash.slice(1)).get('feature');if(STUDIO_FEATURES.some(f=>f.id===target))$('#feature-'+target)?.focus({preventScroll:true});}catch{}
}
