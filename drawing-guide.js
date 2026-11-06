/* Optional guidance: preferences change the reference, never the visitor's marks. */
let drawingGuideState=null;
let guideListeningKey=null;
function getDrawingGuide(){
 if(drawingGuideState)return drawingGuideState;
 const saved=safeGet('dongho-drawing-guide',{})||{};
 const legacy={bird:'garden-bird',garden:'blooming-garden',own:'own'};
 let exampleId=saved.exampleId||legacy[saved.topic]||null;
 if(exampleId!=='own'&&!DRAWING_EXAMPLES.some(x=>x.id===exampleId))exampleId=null;
 const example=DRAWING_EXAMPLES.find(x=>x.id===exampleId);
 const savedMood=INSPIRATION_MOODS.some(x=>x.id===saved.moodId)?saved.moodId:null;
 const moodId=saved.pickerOpen&&savedMood?savedMood:example?.mood||savedMood;
 drawingGuideState={version:2,moodId,exampleId,step:Number.isInteger(saved.step)?Math.max(0,Math.min(4,saved.step)):0,collapsed:!!saved.collapsed,pickerOpen:typeof saved.pickerOpen==='boolean'?saved.pickerOpen:!exampleId};
 return drawingGuideState;
}
function drawingLesson(){const g=getDrawingGuide();return (DRAWING_EXAMPLES.find(x=>x.id===g.exampleId)?.steps||OWN_DRAWING_STEPS)[g.step];}
function guideSketch(){const g=getDrawingGuide();return inspirationSvg(g.exampleId==='own'||!g.exampleId?'abstract-garden':g.exampleId,g.step);}
function guideAvatar(){return `<svg viewBox="0 0 54 54" aria-hidden="true"><path fill="#efd3bc" d="M11 52q0-20 16-20t16 20"/><path fill="#237c6b" d="M6 54q2-18 21-18t21 18"/><ellipse cx="27" cy="23" rx="12" ry="14" fill="#f2bd98"/><path d="M15 26Q5 8 22 6q21-6 19 22l-6-12q-13 4-19-1Z" fill="#342544"/><path d="M23 26h1m7 0h1m-8 6q4 3 8-1" stroke="#342544" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;}
function inspirationPicker(){
 const g=getDrawingGuide(),mood=INSPIRATION_MOODS.find(x=>x.id===g.moodId),current=DRAWING_EXAMPLES.find(x=>x.id===g.exampleId);
 if(!mood)return `<section class="inspiration-picker"><span class="inspiration-eyebrow">A place to begin</span><h2>How are you<br><em>feeling today?</em></h2><p>Choose a feeling and find a little idea to follow.</p><div class="mood-choices" role="group" aria-label="Choose a mood for drawing inspiration">${INSPIRATION_MOODS.map(m=>`<button data-guide-mood="${m.id}" id="guide-mood-${m.id}" style="--mood-color:${m.color}" aria-pressed="false">${moodIcon(m.id)}<span>${m.label}</span></button>`).join('')}</div><button class="own-inspiration" id="guide-own">Or follow my own idea <span aria-hidden="true">↗</span></button>${g.exampleId?`<button class="keep-inspiration" id="guide-keep">Back to ${current?.title||'my own idea'} →</button>`:''}<p class="picker-footnote">Contemporary ideas inspired by Dong Ho.<br>Any feeling can follow any idea.</p></section>`;
 return `<section class="inspiration-picker"><button class="mood-back" id="guide-moods"><span aria-hidden="true">←</span> Choose another feeling</button><div class="chosen-mood" style="--mood-color:${mood.color}">${moodIcon(mood.id)}<div><span>Feeling ${mood.label.toLowerCase()}</span><h2>A little inspiration.</h2></div></div><p>${mood.hint}</p><div class="inspiration-ideas" role="group" aria-label="Three drawing ideas for ${mood.label.toLowerCase()}">${DRAWING_EXAMPLES.filter(x=>x.mood===mood.id).map(x=>`<button class="inspiration-idea" data-guide-example="${x.id}" id="guide-idea-${x.id}" aria-label="Draw ${x.title}"><img src="assets/inspiration/${x.id}.svg" width="320" height="220" alt=""><span><strong>${x.title}</strong><small>${x.description}</small></span><i aria-hidden="true">↗</i></button>`).join('')}</div><button class="own-inspiration" id="guide-own">I have my own idea <span aria-hidden="true">↗</span></button>${g.exampleId?'<button class="keep-inspiration" id="guide-keep">Keep my current guide →</button>':''}<p class="picker-footnote">Contemporary ideas inspired by Dong Ho.<br>Choose freely. Your drawing stays as it is.</p></section>`;
}
function renderDrawingGuide(){
 const g=getDrawingGuide();
 if(g.collapsed)return `<aside id="drawing-guide" class="drawing-guide guide-collapsed"><button id="guide-toggle" aria-expanded="false">✦ <span>Show my drawing guide</span> +</button></aside>`;
 const lesson=drawingLesson(),example=DRAWING_EXAMPLES.find(x=>x.id===g.exampleId),mood=INSPIRATION_MOODS.find(x=>x.id===g.moodId);
 return `<aside id="drawing-guide" class="drawing-guide inspiration-guide" aria-label="Your drawing guide"><div class="guide-person"><div class="guide-avatar">${guideAvatar()}</div><div><strong>Your studio guide</strong><span>A little company for your creativity</span></div><button id="guide-toggle" aria-expanded="true" aria-controls="guide-content" aria-label="Hide drawing guide">−</button></div><div id="guide-content" class="inspiration-content">${g.pickerOpen||!g.exampleId?inspirationPicker():`<div class="inspiration-selection"><div><span>${g.exampleId==='own'?'Your imagination':mood?.label||'Your inspiration'}</span><strong>${example?.title||'My own idea'}</strong></div><button id="guide-change">Change inspiration <span aria-hidden="true">↗</span></button></div><div class="guide-step-label"><span>STEP ${g.step+1} OF 5</span><span>A little at a time</span></div><div class="guide-progress" role="progressbar" aria-label="Drawing guide steps" aria-valuenow="${g.step+1}" aria-valuemin="1" aria-valuemax="5"><span style="width:${(g.step+1)*20}%"></span></div><figure class="inspiration-reference">${guideSketch()}<figcaption>${g.exampleId==='own'?'One possible direction. Keep your own.':'Darker marks show the focus of this step.'}</figcaption></figure><div class="guide-lesson" aria-live="polite"><h2>${lesson.title}</h2><p>${lesson.body}</p></div><div class="inspiration-tip"><span aria-hidden="true">✦</span><p>${lesson.tip}</p></div><button class="guide-preset" id="guide-preset">Set up the ${lesson.tool==='brush'?'brush':'pen'} for me <span aria-hidden="true">↗</span></button><button id="guide-listen" class="guide-listen-one" aria-pressed="false"><span aria-hidden="true">▷</span> Read this step</button><div class="guide-navigation"><button id="guide-back" ${g.step===0?'disabled':''} aria-label="Previous guide step">←</button><button id="guide-next">${g.step===4?'Name my artwork':'Next little step'} <span aria-hidden="true">→</span></button></div><p class="guide-footnote">A contemporary example inspired by Dong Ho.<br>Your own version is always welcome.</p>`}</div></aside>`;
}
function withDrawingGuide(html){return html.replace('<section class="drawing-studio"','<div class="drawing-with-guide"><section class="drawing-studio"').replace('</section><div class="drawing-after">',`</section>${renderDrawingGuide()}</div><div class="drawing-after">`);}
function refreshDrawingGuide(focus){save('dongho-drawing-guide',getDrawingGuide());$('#drawing-guide').outerHTML=renderDrawingGuide();bindDrawingGuide();updateTranscript();if(focus)$(focus)?.focus({preventScroll:true});}
function chooseInspirationMood(id){if(!INSPIRATION_MOODS.some(x=>x.id===id))return;const g=getDrawingGuide();g.moodId=id;g.step=0;g.pickerOpen=true;stopSpeech();refreshDrawingGuide('#guide-moods');}
function chooseInspirationExample(id){const example=DRAWING_EXAMPLES.find(x=>x.id===id);if(id!=='own'&&!example)return;const g=getDrawingGuide();g.exampleId=id;g.moodId=example?.mood||g.moodId;g.step=0;g.pickerOpen=false;stopSpeech();refreshDrawingGuide('#guide-change');}
function updateGuideVoice(state){const button=$('#guide-listen');if(!button)return;const playing=state==='playing';button.setAttribute('aria-pressed',String(playing));button.innerHTML=playing?'<span aria-hidden="true">■</span> Stop reading':'<span aria-hidden="true">▷</span> Read this step';if(!playing)guideListeningKey=null;}
function bindDrawingGuide(){
 if(!$('#drawing-guide'))return;
 $('#guide-toggle').onclick=()=>{getDrawingGuide().collapsed=!getDrawingGuide().collapsed;stopSpeech();refreshDrawingGuide('#guide-toggle');};
 if(getDrawingGuide().collapsed)return;
 $$('[data-guide-mood]').forEach(button=>button.onclick=()=>chooseInspirationMood(button.dataset.guideMood));
 $$('[data-guide-example]').forEach(button=>button.onclick=()=>chooseInspirationExample(button.dataset.guideExample));
 $('#guide-moods')?.addEventListener('click',()=>{getDrawingGuide().moodId=null;getDrawingGuide().step=0;stopSpeech();refreshDrawingGuide('[data-guide-mood]');});
 $('#guide-own')?.addEventListener('click',()=>chooseInspirationExample('own'));
 $('#guide-keep')?.addEventListener('click',()=>{const g=getDrawingGuide();g.pickerOpen=false;g.moodId=DRAWING_EXAMPLES.find(x=>x.id===g.exampleId)?.mood||g.moodId;refreshDrawingGuide('#guide-change');});
 $('#guide-change')?.addEventListener('click',()=>{getDrawingGuide().pickerOpen=true;stopSpeech();refreshDrawingGuide(getDrawingGuide().moodId?'#guide-moods':'[data-guide-mood]');});
 if(getDrawingGuide().pickerOpen||!getDrawingGuide().exampleId)return;
 $('#guide-back').onclick=()=>{getDrawingGuide().step=Math.max(0,getDrawingGuide().step-1);stopSpeech();refreshDrawingGuide('#guide-back');};
 $('#guide-next').onclick=()=>{const g=getDrawingGuide();if(g.step===4){$('#drawing-title').scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center'});$('#drawing-title').focus({preventScroll:true});return;}g.step++;stopSpeech();refreshDrawingGuide('#guide-next');};
 $('#guide-preset').onclick=()=>{const lesson=drawingLesson();applyDrawingPreset(lesson);$('#drawing-status').textContent=`${lesson.tool==='brush'?'Brush':'Pen'} ready. Size ${lesson.size}. Keep following your own lines.`;};
 $('#guide-listen').onclick=()=>{const g=getDrawingGuide(),key=g.exampleId+':'+g.step;if(guideListeningKey===key&&narrating){stopSpeech();return;}const lesson=drawingLesson();guideListeningKey=key;const started=speak(`Step ${g.step+1}. ${lesson.title}. ${lesson.body} ${lesson.tip}`,{onState:updateGuideVoice});if(!started)updateGuideVoice('idle');};
}
