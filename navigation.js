/* One state handoff for ordinary links, feature bubbles and local-file reloads. */
let gatewayNavigation=null;
let gatewayLastFeature=null;
function isStudioPage(href){return /^(?:HomePage|HistoryPage|ExplorePage|WorkshopPage|ExhibitionPage|index)\.html(?:#.*)?$/.test(href||'');}
function buildStudioDestination(href){
 if(!isStudioPage(href))return href;
 initializeDrawing();
 const [file,fragment='']=href.split('#'),params=new URLSearchParams(fragment);
 const payload={language:'en',large:safeGet('dongho-large',false),selected:selectedArt,creation:creationMode,exhibitKind:safeGet('dongho-exhibit-kind','print'),work:studio,completed};
 if(params.get('create')==='free')payload.creation='free';
 payload.historyChapter=historyIndex;
 params.set('studio',JSON.stringify(payload));
 if(originalDrawing?.strokes.length)params.set('drawing',JSON.stringify(originalDrawing));
 if(drawingDraft)params.set('draft',JSON.stringify(drawingDraft));
 return file+'#'+params.toString();
}
function bindStudioNavigation(){
 const prepare=e=>{
  const link=e.target.closest?.('a[href]');if(!link||e.defaultPrevented||link.hasAttribute('download'))return;
  const raw=link.getAttribute('href');if(!isStudioPage(raw))return;
  if(gatewayNavigation)resetGatewayTransition();
  link.setAttribute('href',buildStudioDestination(raw));
 };
 document.onclick=prepare;document.onauxclick=prepare;document.oncontextmenu=prepare;
}
function resetGatewayTransition(restoreFocus=false){
 if(gatewayNavigation){clearTimeout(gatewayNavigation.timer);gatewayNavigation.overlay?.remove();gatewayNavigation=null;}
 document.body.classList.remove('gateway-leaving');
 if(restoreFocus){const id=gatewayLastFeature||safeGet('dongho-home-focus',null);if(id)$('#feature-'+id)?.focus({preventScroll:true});}
}
function openGatewayFeature(event,link){
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
 event.preventDefault();if(gatewayNavigation)return;
 if(link.dataset.feature==='create'){creationMode='free';save('dongho-creation-mode','free');}
 const destination=buildStudioDestination(link.getAttribute('href'));
 gatewayLastFeature=link.dataset.feature;save('dongho-home-focus',gatewayLastFeature);
 const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 if(reduce||document.body.classList.contains('motion-paused')||typeof window.requestAnimationFrame!=='function'){window.location.assign(destination);return;}
 const shell=$('.gateway-sphere',link),rect=(shell||link).getBoundingClientRect();
 const diameter=Math.max(rect.width,rect.height),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
 const reach=Math.hypot(Math.max(cx,window.innerWidth-cx),Math.max(cy,window.innerHeight-cy));
 const overlay=document.createElement('div');overlay.className='gateway-transition';overlay.setAttribute('aria-hidden','true');
 overlay.style.setProperty('--transition-x',cx+'px');overlay.style.setProperty('--transition-y',cy+'px');overlay.style.setProperty('--transition-size',diameter+'px');overlay.style.setProperty('--transition-scale',String((reach*2+30)/diameter));overlay.style.setProperty('--transition-color',link.dataset.transitionColor||'#ede6f3');
 document.body.appendChild(overlay);document.body.classList.add('gateway-leaving');
 const timer=setTimeout(()=>{window.location.assign(destination);},340);gatewayNavigation={timer,overlay,destination};
 window.requestAnimationFrame(()=>overlay.classList.add('is-expanding'));
}
function backToStudio(){const key={history:'history',explore:'symbols',workshop:'create',exhibition:'gallery'}[page];return `<div class="wrap studio-return"><a href="HomePage.html#feature=${key}" class="back-to-studio"><span aria-hidden="true">↖</span> Back to the studio</a></div>`;}
window.addEventListener('pageshow',event=>{const back=event.persisted||window.performance?.getEntriesByType?.('navigation')?.[0]?.type==='back_forward';resetGatewayTransition(back&&document.body.dataset.page==='home');});
window.addEventListener('pagehide',()=>resetGatewayTransition());
