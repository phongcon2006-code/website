/* An isolated teaching illustration, never the workshop's print state or blocks. */
(() => {
 'use strict';
 const source='https://commons.wikimedia.org/wiki/File:Mice%27s_wedding,_Dong_Ho_picture,_paper_-_Vietnam_National_Museum_of_Fine_Arts_-_Hanoi,_Vietnam_-_DSC05290.JPG';
 const steps=[
  {title:'The paper',short:'Paper',text:'Before the first impression, there is the surface. Dó bark paper is coated with a preparation containing powdered shells. Its pale, textured ground becomes part of the picture.'},
  {title:'The first impression',short:'First pigment',text:'A carved block carries one color. Here, earth red makes the first shapes visible: a garment, a roof, the body of a cat. Red ochre is one documented source of this pigment.'},
  {title:'Color builds',short:'Color layers',text:'Separate blocks add further colors, each impression meeting the last. This teaching study brings together plant green, shell white, and golden yellow. The paper coating and a white printed layer are different steps.'},
  {title:'The defining line',short:'Black contours',text:'The final black impression gives the figures their contours and expression. Compare this simplified study with the museum print below: a shared subject, with different marks and details.'}
 ];
 // Shapes are deliberately separated: color groups have no contours, and the
 // final group contains only black strokes/marks, never concealed color fills.
 function art(stage=0){
  const mice=[[126,158,.87],[298,158,.87],[466,158,.87],[129,420,.95],[315,420,.95],[704,420,.95]];
  const each=shape=>mice.map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})">${shape}</g>`).join('');
  const head='M-29 25Q-42-12-21-28Q2-48 31-20L59-6Q64 0 55 8L28 16L30 29Z';
  const coat='M-27 28L-35 74L33 74L25 30Z';
  const cat='M650 242Q615 180 635 107Q652 66 685 111Q724 98 745 127L791 139L804 176L769 197L766 264H645Q623 256 650 242Z';
  return `<svg class="print-study stage-${stage}" viewBox="0 0 900 600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
   <path fill="#ecddba" d="M0 0H900V600H0Z"/>
   <g stroke="#87734d" stroke-width="1" opacity=".12"><path d="M32 43l89 2m155-13l110 4m190 11l218-7M70 278l140-2m290 11l298-5M36 568l190 3m198-3l194 2m80-12l130 2"/></g>
   <g class="print-layer print-red" fill="#b74732" stroke="none">${each(`<path d="${coat}"/>`)}<path d="${cat}"/><path d="M380 333H555L537 355H394ZM397 352H537V454H397Z"/></g>
   <g class="print-layer print-green" fill="#58734d" stroke="none"><path d="M396 454H546L531 492H411ZM540 298Q580 244 620 298ZM613 357H641V466H613Z"/></g>
   <g class="print-layer print-white" fill="#f8f1db" stroke="none"><path d="M410 366H524V441H410Z"/></g>
   <g class="print-layer print-yellow" fill="#d5a24b" stroke="none">${each(`<path d="${head}"/>`)}<path d="M95 112L173 95L178 128L96 139ZM258 112L332 101L331 131L261 141ZM441 102L517 111L513 138L437 129ZM366 370H566V385H366Z"/></g>
   <g class="print-layer print-black" fill="none" stroke="#292620" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    ${each(`<path d="${head}M-23 1Q-51-24-27-35Q-7-40-5-16M-27 31Q-63 50-76 25Q-82 3-99 15M-17 74L-23 91H-2M20 74L26 91H43M25 37L52 31L63 11M-21 42L0 51L32 39M49 3L66-1M48 8L66 11M-25 58H21M-12 30V74"/><path d="${coat}"/><circle cx="27" cy="-11" r="3.5" fill="#292620" stroke="none"/>`)}
    <path d="${cat}M665 155Q690 170 707 158M720 176L756 185M727 190L756 203M661 232L657 262M682 233L680 262M744 203Q765 257 813 232Q843 218 815 192M656 111L663 136M681 111L674 136"/>
    <circle cx="739" cy="144" r="5" fill="#292620" stroke="none"/>
    <path d="M380 333H555L537 355H394ZM397 355H537V454H397ZM366 370H566V385H366ZM396 454H546L531 492H411ZM436 494V524M514 494V524M580 257V365M540 298Q580 244 620 298ZM535 302H626M580 262V235M448 369Q476 336 499 369V439H448ZM463 382V427M480 386V427M182 145L233 131L220 148L234 160L182 151ZM335 156Q360 124 390 147Q366 166 335 156ZM510 132L546 114V154ZM150 396H219M308 399H372M645 409H707"/>
    <path d="M60 60H840V550H60ZM70 308Q441 291 824 308" stroke-width="2"/>
   </g></svg>`;
 }
 function html(){return `<section id="print-story" class="wrap print-story story-static" aria-labelledby="print-story-title">
  <div class="print-story-heading"><span class="print-eyebrow">PAPER · PIGMENT · IMPRESSION</span><h2 id="print-story-title">A painting, one<br>impression at a time.</h2><p>A few colors. A succession of carved blocks.<br>A picture brought together by hand.</p></div>
  <div class="print-story-controls" role="group" aria-label="Choose a printing stage">${steps.map((s,i)=>`<button type="button" data-print-stage="${i}" aria-controls="print-step-${i}"><span aria-hidden="true">0${i+1}</span> ${s.short}</button>`).join('')}</div>
  <div class="print-story-layout"><figure class="print-story-sticky"><div class="print-story-art" role="img" aria-label="Educational illustration: the prepared paper">${art()}</div><figcaption><span class="print-stage-label">01 / The paper</span><span>Educational reconstruction · Mouse Wedding study</span></figcaption></figure>
   <div class="print-story-steps">${steps.map((s,i)=>`<article class="print-story-step" id="print-step-${i}" data-print-step="${i}" tabindex="-1"><div class="print-inline-art">${art(i)}</div><span class="print-step-number" aria-hidden="true">0${i+1}</span><h3>${s.title}</h3><p>${s.text}</p>${i===3?`<figure class="print-reference"><img src="assets/mouse-wedding-museum.jpg" alt="Museum print of Mouse Wedding: mice carry gifts toward a large cat above a wedding procession." width="1280" height="870" loading="lazy" decoding="async"><figcaption>Mouse Wedding · Vietnam National Museum of Fine Arts<br>Photograph: Daderot · CC0 · <a href="${source}">View source</a></figcaption></figure>`:''}</article>`).join('')}</div>
  </div>
  <div class="print-story-credit" id="home-artwork-credit"><p>The animated study is a contemporary teaching illustration, not a historical block set. Its colors and sequence simplify a hand-printing process; individual prints differ. The museum photograph is reproduced without recoloring; the sphere uses a cropped detail.</p><p><a href="https://ich.unesco.org/en/USL/art-of-dong-ho-folk-woodblock-printing-01737">About the craft · UNESCO</a><span aria-hidden="true"> / </span><a href="${source}">Photograph &amp; CC0 license · Wikimedia Commons</a></p></div>
 </section>`;}
 let root=null,observer=null,media=null,onResize=null,buttons=[],active=0,paused=false;
 function select(index){
  if(!root||!Number.isInteger(index)||index<0||index>=steps.length)return;
  active=index;root.dataset.stage=String(index);
  const svg=root.querySelector('.print-story-art svg');
  svg.setAttribute('class',`print-study stage-${index}`);
  root.querySelector('.print-story-art').setAttribute('aria-label',`Educational illustration: ${steps[index].title.toLowerCase()}`);
  root.querySelector('.print-stage-label').textContent=`0${index+1} / ${steps[index].title}`;
  buttons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
 }
 function configure(){
  if(!root)return;
  observer?.disconnect();observer=null;
  const interactive=!paused&&!!media?.matches&&typeof window.IntersectionObserver==='function';
  root.classList.toggle('story-interactive',interactive);root.classList.toggle('story-static',!interactive);
  if(!interactive)return;
  observer=new window.IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
   if(visible.length)select(Number(visible[0].target.dataset.printStep));
  },{rootMargin:'-25% 0px -35% 0px',threshold:[0,.15,.5]});
  root.querySelectorAll('[data-print-step]').forEach(step=>observer.observe(step));
 }
 function destroy(){observer?.disconnect();observer=null;media?.removeEventListener?.('change',onResize);buttons.forEach(button=>button.onclick=null);buttons=[];root=null;media=null;onResize=null;}
 function mount(){
  destroy();root=document.querySelector('#print-story');if(!root)return;
  media=window.matchMedia?.('(min-width: 900px) and (min-height: 650px)');
  buttons=[...root.querySelectorAll('[data-print-stage]')];
  buttons.forEach(button=>button.onclick=()=>{
   const index=Number(button.dataset.printStage);select(index);
   const step=root.querySelector(`#print-step-${index}`);
   step.scrollIntoView({block:'center',behavior:'instant'});
   // Manual navigation moves focus with the visible passage. Scroll-driven
   // selection never takes focus from the visitor's current control.
   step.focus({preventScroll:true});
  });
  onResize=configure;media?.addEventListener?.('change',onResize);select(active);configure();
 }
 function setMotion(value){if(paused===!!value&&root)return;paused=!!value;configure();}
 window.HomePrintStory={html,mount,destroy,setMotion};
})();
