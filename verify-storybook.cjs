/* Interaction models, not a browser/layout emulator. No downloaded test dependencies. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=__dirname;
function harness({page='history',guide,voice=true,reduce=false}={}){
 const regions=new Map(),stored=new Map(),spoken=[],audio={cancels:0,pauses:0,resumes:0};let focused=null;
 if(guide!==undefined)stored.set('dongho-drawing-guide',JSON.stringify(guide));
 const all=()=>[...regions.values()].flat();
 const match=(node,selector)=>{
  if(selector.startsWith('#'))return node.attrs.id===selector.slice(1);
  if(selector.startsWith('.'))return (node.attrs.class||'').split(' ').includes(selector.slice(1));
  const attrs=[...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
  return attrs.length>0&&attrs.every(([,k,v])=>k in node.attrs&&(v===undefined||node.attrs[k]===v));
 };
 function node(attrs={},mobile=false){
  const listeners=new Map(),classes=new Set((attrs.class||'').split(' ').filter(Boolean));
  const e={attrs,dataset:{},style:{setProperty(k,v){this[k]=v;}},textContent:'',innerHTML:'',hidden:'hidden' in attrs,open:false,disabled:'disabled' in attrs,
   classList:{toggle(k,on){if(on===undefined)on=!classes.has(k);on?classes.add(k):classes.delete(k);},add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k)},
   setAttribute(k,v){attrs[k]=String(v);},getAttribute:k=>attrs[k]??null,
   focus(){focused=e;},scrollIntoView(options){e.scrollOptions=options;},closest:s=>mobile&&s==='.mobile-chapter-list'?{}:null,
   getBoundingClientRect:()=>({left:100,right:600,top:100,bottom:650}),
   addEventListener(name,fn){if(!listeners.has(name))listeners.set(name,[]);listeners.get(name).push(fn);},
   dispatch(name,event={}){event.target??=e;event.preventDefault??=()=>{event.defaultPrevented=true;};e['on'+name]?.(event);for(const fn of listeners.get(name)||[])fn(event);return event;},
   showModal(){e.open=true;},close(){e.open=false;e.dispatch('close');},
   escape(){const event=e.dispatch('cancel');if(!event.defaultPrevented)e.close();}
  };
  for(const [key,value] of Object.entries(attrs))if(key.startsWith('data-'))e.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
  Object.defineProperty(e,'outerHTML',{set:html=>mount(html,'guide')});return e;
 }
 function mount(html,region='page'){
  const nodes=[];for(const found of html.matchAll(/<([a-z][a-z0-9-]*)\b([^<>]*)>/gi)){
   const attrs={};for(const [,key,_quote,value] of found[2].matchAll(/([^\s=]+)(?:=(['"])(.*?)\2)?/g))attrs[key]=value??'';
   const mobile=html.slice(0,found.index).lastIndexOf('class="mobile-chapter-list"')>html.slice(0,found.index).lastIndexOf('</nav>');
   if(attrs.id||Object.keys(attrs).some(k=>k.startsWith('data-')))nodes.push(node(attrs,mobile));
  }regions.set(region,nodes);return html;
 }
 const document={body:{dataset:{page}},querySelector:s=>all().find(n=>match(n,s))||null,querySelectorAll:s=>all().filter(n=>match(n,s)),documentElement:{style:{setProperty(){}}}};
 const c={console,document,URLSearchParams,location:{hash:'',pathname:'/studio/HistoryPage.html',protocol:'file:'},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},setTimeout:()=>1,clearTimeout(){},addEventListener(){},matchMedia:()=>({matches:reduce})};
 c.window=c;if(voice){c.SpeechSynthesisUtterance=function(text){this.text=text;};c.speechSynthesis={paused:false,getVoices:()=>[{lang:'en-GB'}],speak:u=>spoken.push(u),cancel:()=>audio.cancels++,pause(){audio.pauses++;this.paused=true;},resume(){audio.resumes++;this.paused=false;}};}
 vm.createContext(c);for(const file of ['art-data.js','navigation.js','heritage.js','history-reader.js','home-print-story.js','modern-home.js','free-draw.js','drawing-inspiration.js','drawing-guide.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
 vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/\nrender\(\);\s*$/,'\n'),c);
 const run=source=>vm.runInContext(source,c),get=id=>document.querySelector('#'+id),click=id=>{assert(get(id),'Missing control '+id);get(id).dispatch('click');};
 c.mountHistory=focus=>{mount(run('heritagePage()+footer()'));run('bindHeritage()');if(focus)document.querySelector(focus)?.focus();};
 run('render=mountHistory');
 return {c,run,get,click,mount,stored,spoken,audio,focused:()=>focused,history:()=>c.mountHistory(),guide:()=>{mount(run('renderDrawingGuide()'),'guide');run('bindDrawingGuide()');}};
}
let checks=0;const check=(name,fn)=>{fn();checks++;console.log('PASS '+name);};
check('all six stories appear openly once, with original evidence and source dates',()=>{
 const h=harness();for(let i=0;i<6;i++){
  h.c.chapter=i;const html=h.run('historyIndex=chapter;heritagePage()+footer()'),chapter=h.run('histories()[historyIndex]');
  assert(!/<details|<summary/.test(html));assert(!/id="(?:narrate|transcript|listen-chapter)"/.test(html));
  for(const text of [chapter.intro,...chapter.deeper])assert.equal(html.split(text).length-1,1);
  assert(html.includes(chapter.imageNote));assert(html.includes(chapter.reflection));assert(html.includes(chapter.kind));
  assert.equal((html.match(/id="reader-(?:read|listen|sources)"/g)||[]).length,3);
  for(const id of chapter.sources){h.c.sourceId=id;const source=h.run('HERITAGE_SOURCES[sourceId]');for(const value of [source.url,source.publisher,source.date])assert(html.includes(value));}
  assert(html.includes('role="tabpanel"'));assert(html.includes('aria-labelledby="history-sources-title"'));assert(html.includes('reconstructions'));
 }
 h.run("page='explore'");assert(h.run('footer()').includes('id="narrate"'));
});
check('sources open with focus, close/Escape restore the opener, and outside click dismisses',()=>{
 const h=harness();h.history();h.click('reader-sources');assert(h.get('history-sources').open);assert.equal(h.focused(),h.get('close-history-sources'));
 h.click('close-history-sources');assert(!h.get('history-sources').open);assert.equal(h.focused(),h.get('reader-sources'));
 h.click('reader-sources');h.get('history-sources').escape();assert.equal(h.focused(),h.get('reader-sources'));
 h.click('reader-sources');h.get('history-sources').dispatch('click',{clientX:150,clientY:150});assert(h.get('history-sources').open);
 h.get('history-sources').dispatch('click',{clientX:20,clientY:20});assert(!h.get('history-sources').open);
 const footerButton=h.c.document.querySelectorAll('[data-reader-sources]').at(-1);footerButton.dispatch('click');h.get('history-sources').escape();assert.equal(h.focused(),footerButton);
});
check('chapter listening reads the complete story and supports pause/resume/stop/read',()=>{
 const h=harness();h.history();assert(h.get('history-listening').hidden);h.click('reader-listen');assert(!h.get('history-listening').hidden);
 const spoken=h.spoken.at(-1).text,chapter=h.run('histories()[0]');for(const text of [chapter.title,chapter.intro,...chapter.deeper])assert(spoken.includes(text));
 h.click('reader-listen');assert.equal(h.spoken.length,1);h.click('reader-playback');assert.equal(h.audio.pauses,1);assert.equal(h.run('historyReader.voice'),'paused');
 h.click('reader-playback');assert.equal(h.audio.resumes,1);h.click('reader-stop');assert.equal(h.run('historyReader.voice'),'idle');assert(h.get('reader-stop').hidden);
 h.click('reader-playback');assert.equal(h.spoken.length,2);h.click('reader-read');assert(h.get('history-listening').hidden);assert.equal(h.run('narrating'),false);
});
check('source notes pause narration; completion, stale callbacks and missing voices recover',()=>{
 const h=harness();h.history();h.click('reader-listen');const old=h.spoken.at(-1);h.click('reader-sources');assert.equal(h.run('historyReader.voice'),'paused');
 h.get('history-sources').escape();h.click('reader-playback');h.spoken.at(-1).onend();assert.equal(h.run('historyReader.voice'),'ended');assert.equal(h.run('narrating'),false);
 h.click('reader-playback');old.onend();assert.equal(h.run('historyReader.voice'),'playing');h.spoken.at(-1).onerror();assert.equal(h.run('historyReader.voice'),'unavailable');
 h.click('reader-playback');h.click('reader-playback');assert(h.c.speechSynthesis.paused);h.click('next-history');h.click('reader-listen');assert(!h.c.speechSynthesis.paused);assert.equal(h.run('historyReader.voice'),'playing');
 h.run("stopSpeech();speechSynthesis.speak=()=>{throw Error('unavailable')}");h.click('reader-playback');assert.equal(h.run('historyReader.voice'),'unavailable');assert.equal(h.run('narrating'),false);
 const unavailable=harness({voice:false});unavailable.history();unavailable.click('reader-listen');assert.equal(unavailable.run('historyReader.voice'),'unavailable');assert(unavailable.get('reader-audio-status').textContent.includes('Every word'));unavailable.click('reader-read');
});
check('Follow the words focuses the visible transcript and honors reduced motion',()=>{
 for(const reduce of [false,true]){const h=harness({reduce});h.history();h.click('reader-listen');h.click('reader-follow');assert.equal(h.focused(),h.get('chapter-words'));assert.equal(h.get('chapter-words').scrollOptions.behavior,reduce?'auto':'smooth');}
});
check('desktop bookmarks and phone chooser move through all chapters with restored focus',()=>{
 const h=harness();h.history();h.get('history-tab-0').dispatch('keydown',{key:'End'});assert.equal(h.run('historyIndex'),5);assert.equal(h.focused(),h.get('history-tab-5'));
 h.get('history-tab-5').dispatch('keydown',{key:'ArrowDown'});assert.equal(h.run('historyIndex'),0);h.get('history-tab-0').dispatch('keydown',{key:'ArrowUp'});assert.equal(h.run('historyIndex'),5);
 h.get('history-tab-5').dispatch('keydown',{key:'Home'});assert.equal(h.run('historyIndex'),0);
 h.click('open-chapter-chooser');assert(h.get('chapter-chooser').open);assert.equal(h.focused(),h.get('close-chapter-chooser'));h.get('chapter-chooser').escape();assert.equal(h.focused(),h.get('open-chapter-chooser'));
 h.click('open-chapter-chooser');const mobile=h.c.document.querySelectorAll('[data-history]').find(n=>n.dataset.history==='3'&&!n.attrs.id);mobile.dispatch('click');assert.equal(h.run('historyIndex'),3);assert.equal(h.focused(),h.get('chapter-title'));assert(!h.get('chapter-chooser').open);
 h.click('reader-listen');h.click('next-history');assert.equal(h.run('historyIndex'),4);assert.equal(h.run('narrating'),false);assert.equal(h.run('historyReader.mode'),'read');
 h.click('previous-history');assert.equal(h.run('historyIndex'),3);assert.equal(JSON.parse(h.stored.get('dongho-history-chapter')),3);
});
check('six moods contain the agreed 18 distinct subjects and five subject-specific lessons',()=>{
 const h=harness(),moods=h.run('INSPIRATION_MOODS'),examples=h.run('DRAWING_EXAMPLES');assert.equal(moods.length,6);assert.equal(examples.length,18);
 const expected=[['Garden Bird','Blooming Garden','Dancing Fish'],['Sleeping Cat','Lotus Pond','Moonlit River'],['Rainy Window','Bird on a Branch','Sheltered Seedling'],['Sunrise Rooster','Leaping Carp','Swirling Dragon'],['Old Banyan Tree','Boat Beneath the Moon','Path Through Fields'],['A Single Leaf','Little Pig','Abstract Garden']];
 moods.forEach((m,i)=>assert.deepEqual(Array.from(examples.filter(e=>e.mood===m.id),e=>e.title),expected[i]));
 assert.equal(new Set(examples.map(e=>e.id)).size,18);assert.equal(new Set(examples.flatMap(e=>e.steps.map(s=>s.body))).size,90);
 for(const e of examples){assert.equal(e.parts.length,5);assert.equal(e.steps.length,5);for(const s of e.steps){assert(s.title.length>8);assert(s.body.split(/\s+/).length>=15);assert(s.tip.length>15);assert(['ink','brush'].includes(s.tool));assert(s.size>=2&&s.size<=60);assert(/^#[0-9a-f]{6}$/i.test(s.color));}}
});
check('every bundled preview matches its source and emphasizes the current reference part',()=>{
 const h=harness();for(const e of h.run('DRAWING_EXAMPLES')){h.c.exampleId=e.id;const full=h.run('inspirationSvg(exampleId)');assert.equal(fs.readFileSync(path.join(root,'assets/inspiration',e.id+'.svg'),'utf8').trim(),full.trim());assert(full.includes('role="img"'));assert(full.includes('<title>'));assert(!/<script|https?:\/\/(?!www\.w3\.org)/.test(full));
  for(let step=0;step<5;step++){h.c.step=step;const svg=h.run('inspirationSvg(exampleId,step)'),parts=[...svg.matchAll(/data-reference-part="(\d)" opacity="([.\d]+)"/g)];assert.equal(parts.length,5);for(const [,index,opacity] of parts)assert.equal(Number(opacity),+index===step?1:+index<step?.75:.22);}
 }
});
check('legacy bird/garden/own preferences migrate without losing step or guide visibility',()=>{
 for(const [topic,id,moodId] of [['bird','garden-bird','joyful'],['garden','blooming-garden','joyful'],['own','own',null]]){const h=harness({guide:{topic,step:3,collapsed:true}}),g=h.run('getDrawingGuide()');assert.equal(g.exampleId,id);assert.equal(g.moodId,moodId);assert.equal(g.step,3);assert(g.collapsed);assert(!g.pickerOpen);assert.equal(g.version,2);h.guide();h.click('guide-toggle');assert.equal(JSON.parse(h.stored.get('dongho-drawing-guide')).exampleId,id);}
 const invalid=harness({guide:{moodId:'bad',exampleId:'<bad>',step:99}});assert.equal(invalid.run('getDrawingGuide().exampleId'),null);assert.equal(invalid.run('getDrawingGuide().step'),4);assert(invalid.run('renderDrawingGuide()').includes('How are you'));
});
check('the optional picker progresses through every mood and idea without blocking blank paper',()=>{
 const h=harness({page:'workshop'});h.run('initializeDrawing()');h.guide();assert(h.run('renderDrawingGuide()').includes('How are you'));assert.equal(h.c.document.querySelectorAll('[data-guide-mood]').length,6);assert.equal(h.run('drawingDraft.strokes.length'),0);
 for(const mood of h.run('INSPIRATION_MOODS')){h.run('getDrawingGuide().moodId=null;getDrawingGuide().pickerOpen=true');h.guide();h.click('guide-mood-'+mood.id);assert.equal(h.c.document.querySelectorAll('[data-guide-example]').length,3);assert.equal(h.focused(),h.get('guide-moods'));
  for(const example of h.run('DRAWING_EXAMPLES').filter(e=>e.mood===mood.id)){if(h.get('guide-change'))h.click('guide-change');h.click('guide-idea-'+example.id);assert.equal(h.run('getDrawingGuide().exampleId'),example.id);assert.equal(h.run('getDrawingGuide().step'),0);assert(!h.get('guide-own'));assert(h.get('guide-change'));assert.equal(h.focused(),h.get('guide-change'));}
 }
 assert.equal(h.run('drawingDraft.strokes.length'),0);
});
check('changing inspiration preserves title, paper, exhibited artwork and undo/redo exactly',()=>{
 const h=harness({page:'workshop'});h.run(`initializeDrawing();drawingDraft={title:'My unfinished story',name:'Maker',paper:'#f0e8ff',strokes:[{tool:'ink',color:'#342544',size:8,points:[[10,10,1],[70,100,1]]}]};originalDrawing=cleanDrawing(drawingDraft);drawUndo=[[]];drawRedo=[[{tool:'ink',color:'#237c6b',size:4,points:[[1,2,1]]}]];`);
 const snapshot=()=>h.run('JSON.stringify({drawingDraft,originalDrawing,drawUndo,drawRedo,drawingTool,drawingColor,drawingSize})'),before=snapshot();h.guide();
 for(const mood of h.run('INSPIRATION_MOODS')){h.c.moodId=mood.id;h.run('chooseInspirationMood(moodId)');for(const e of h.run('DRAWING_EXAMPLES').filter(e=>e.mood===mood.id)){h.c.exampleId=e.id;h.run('chooseInspirationExample(exampleId)');h.click('guide-next');h.click('guide-change');assert.equal(snapshot(),before);}}
 h.click('guide-own');assert.equal(h.run('getDrawingGuide().exampleId'),'own');assert.equal(snapshot(),before);
 // Prove selection and refresh never even attempt Canvas painting.
 assert(!allSource('drawing-guide.js').includes('getContext('));assert(!allSource('drawing-guide.js').includes('repaintDrawing('));
});
check('own ideas, canceling a change, hide/restore and the last step retain usable focus',()=>{
 const h=harness({page:'workshop'});h.mount('<input id="drawing-title">','canvas');h.guide();h.click('guide-own');assert(h.run('renderDrawingGuide()').includes('My own idea'));
 h.click('guide-toggle');assert(h.run('getDrawingGuide().collapsed'));assert.equal(h.focused(),h.get('guide-toggle'));h.click('guide-toggle');
 h.click('guide-change');h.click('guide-mood-calm');h.click('guide-keep');assert.equal(h.run('getDrawingGuide().exampleId'),'own');assert(!h.run('getDrawingGuide().pickerOpen'));
 for(let i=0;i<4;i++)h.click('guide-next');assert.equal(h.run('getDrawingGuide().step'),4);h.click('guide-next');assert.equal(h.focused(),h.get('drawing-title'));h.click('guide-back');assert.equal(h.run('getDrawingGuide().step'),3);
 h.run("chooseInspirationExample('garden-bird')");h.click('guide-change');h.click('guide-moods');h.click('guide-mood-sad');h.click('guide-keep');assert.equal(h.run('getDrawingGuide().moodId'),'joyful');
});
check('guide speech has one toggle and follows the chosen subject and current step',()=>{
 const h=harness({page:'workshop'});h.guide();h.run("chooseInspirationExample('lotus-pond')");h.click('guide-listen');assert(h.spoken.at(-1).text.includes(h.run('drawingLesson().body')));assert.equal(h.get('guide-listen').getAttribute('aria-pressed'),'true');
 h.click('guide-listen');assert.equal(h.run('narrating'),false);h.click('guide-listen');h.click('guide-next');assert.equal(h.run('narrating'),false);h.click('guide-listen');assert(h.spoken.at(-1).text.startsWith('Step 2.'));h.spoken.at(-1).onend();assert.equal(h.get('guide-listen').getAttribute('aria-pressed'),'false');
 assert(!h.run('renderDrawingGuide()').includes('id="guide-stop"'));
});
check('English reading and guide states remain English with old language preferences',()=>{
 const h=harness();h.run("lang='vi'");const vietnamese=/[\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01a0\u01a1\u01af\u01b0\u1ea0-\u1ef9]/;
 for(let i=0;i<6;i++){h.c.index=i;assert(!vietnamese.test(h.run('historyIndex=index;heritagePage()+footer()')));}
 h.run("page='workshop'");for(const e of h.run('DRAWING_EXAMPLES')){h.c.id=e.id;h.run('getDrawingGuide().exampleId=id;getDrawingGuide().pickerOpen=false');for(let i=0;i<5;i++){h.c.index=i;assert(!vietnamese.test(h.run('getDrawingGuide().step=index;renderDrawingGuide()')));}}
});
check('new local modules load in order, mobile references remain visible, and motion can reduce',()=>{
 for(const file of ['HomePage','HistoryPage','ExplorePage','WorkshopPage','ExhibitionPage','index']){const html=allSource(file+'.html');for(const module of ['history-reader.js','drawing-inspiration.js','storybook.css'])assert(html.includes(module));assert(html.indexOf('drawing-inspiration.js')<html.indexOf('drawing-guide.js'));assert(html.indexOf('history-reader.js')<html.indexOf('app.js'));}
 const css=allSource('storybook.css');assert(css.includes('.inspiration-reference{'));assert(css.includes('display:block!important'));assert(css.includes('@media(max-width:600px)'));assert(css.includes('@media(prefers-reduced-motion:reduce)'));assert(css.includes('.mobile-chapter-chooser{display:none}'));
});
check('new reading controls, source notes and mood labels meet 4.5:1 text contrast',()=>{
 const css=allSource('storybook.css');
 function color(selector){let value;for(const [,selectors,body]of css.matchAll(/([^{}]+)\{([^{}]*)\}/g))if(selectors.trim().split(',').includes(selector))for(const [,v]of body.matchAll(/(?:^|;)color:(#[a-f\d]{6})(?:;|$)/gi))value=v;assert(value,selector);return value;}
 function lum(hex){const channels=hex.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;}
 const pairs=[['.storybook-body p','#fffdf8'],['.chapter-bookmark small','#f0e7ec'],['.chapter-bookmark strong','#f3edf2'],['.reader-toolbar button','#fffaf5'],['.reader-toolbar .reader-mode.active','#f0e2e8'],['.reader-audio-copy>span','#f5eef6'],['.reader-follow','#f5eef6'],['.storybook-reflection small','#f3e9e5'],['.storybook-page-number','#fffdf8'],['.reader-source-note p','#f4eaf2'],['.reader-source-list li>span','#fffaf3'],['.inspiration-picker>p','#fbf5ff'],['.inspiration-picker .picker-footnote','#fbf5ff'],['.inspiration-idea small','#fffcf8'],['.chosen-mood>div>span','#fbf5ff'],['.inspiration-selection button','#f1e5f3'],['.inspiration-reference figcaption','#fff9f1'],['.inspiration-guide .guide-lesson p','#fbf5ff'],['.inspiration-guide .guide-footnote','#fbf5ff'],['.inspiration-guide .guide-navigation #guide-back','#eee0f5']];
 const moods=harness().run('INSPIRATION_MOODS');for(const m of moods)pairs.push(['.mood-choices button[data-guide-mood='+m.id+']','#f6eef0']);
 for(const [selector,bg]of pairs){const a=lum(color(selector)),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert(ratio>=4.5,selector+' contrast '+ratio.toFixed(2));}
 for(const [fg,bg]of [['#fffaf4','#925466'],['#ffffff','#80528d']])assert((lum(fg)+.05)/(lum(bg)+.05)>=4.5);
});
function allSource(file){return fs.readFileSync(path.join(root,file),'utf8');}
console.log(`\n${checks} storybook and inspiration checks passed. Native dialog focus/Escape, layout, touch and speech still need browser QA.`);
