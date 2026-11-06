const fs=require('fs');
const path=require('path');
const vm=require('vm');
const assert=require('assert/strict');
const root=__dirname;
const storage=new Map();
const element=()=>({textContent:'',innerHTML:'',hidden:false,disabled:false,isConnected:true,style:{setProperty(){}},dataset:{},classList:{add(){},remove(){},toggle(){return true;}},setAttribute(){},focus(){},addEventListener(){}});
const nodes=new Map();
const context={console,setTimeout,clearTimeout,Uint8ClampedArray,Uint8Array,ImageData:class{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{body:{dataset:{page:'home'}},documentElement:{style:{setProperty(){}}},querySelector:s=>{if(!nodes.has(s))nodes.set(s,element());return nodes.get(s);},querySelectorAll:()=>[]},addEventListener(){}};
context.window=context;
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'art-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'navigation.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'heritage.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'history-reader.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'home-print-story.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'modern-home.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'free-draw.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'drawing-inspiration.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'drawing-guide.js'),'utf8'),context);
const source=fs.readFileSync(path.join(root,'app.js'),'utf8');
assert(/\nrender\(\);\s*$/.test(source));
vm.runInContext(source.replace(/\nrender\(\);\s*$/,'\n'),context);
let checks=0;
const check=(message,fn)=>{fn();checks++;console.log('PASS '+message);};
const run=code=>vm.runInContext(code,context);
function validateFragment(html,label){
 assert.equal((html.match(/<h1\b/g)||[]).length,1,label+' has one h1');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,label+' IDs are unique');
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=m[1];if(/^(https?:|data:)/.test(ref))continue;
  if(ref.startsWith('#')){assert(ids.includes(ref.slice(1)),label+' missing anchor '+ref);continue;}
  assert(fs.existsSync(path.join(root,ref.split('#')[0])),label+' missing file '+ref);
 }
 assert(!html.includes('undefined'),label+' has no undefined interpolation');
 assert(!/[ĂÂĐÊÔƠƯăâđêôơưẠ-ỹ]/u.test(html),label+' has untranslated interface content');
}
check('five local HTML entry points and assets',()=>{for(const name of ['HomePage','HistoryPage','ExplorePage','WorkshopPage','ExhibitionPage']){const html=fs.readFileSync(path.join(root,name+'.html'),'utf8');for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g))assert(fs.existsSync(path.join(root,m[1])));assert(html.includes('charset="UTF-8"'));}});
check('all five page renderers are English-only even with an old language preference',()=>{for(const language of ['en','vi'])for(const p of ['home','history','explore','workshop','exhibition']){const html=run(`lang='${language}';page='${p}';header()+${p==='history'?'heritagePage':p}()+footer()`);validateFragment(html,language+'/'+p);assert(html.includes('Sources'));assert(!html.includes('id="language"'));assert(!/[ĂÂĐÊÔƠƯăâđêôơưẠ-ỹ]/u.test(html),p+' contains untranslated content');}});
check('all workshop stages and selected studies in both languages',()=>{for(const language of ['en','vi'])for(const art of ['mouse','pigs','chickens'])for(let s=0;s<5;s++){const html=run(`lang='${language}';creationMode='print';page='workshop';studio.art='${art}';studio.stage=${s};header()+workshop()+footer()`);validateFragment(html,`${language}/${art}/stage${s}`);}});
check('every heritage chapter and artwork detail renders in English',()=>{for(let i=0;i<run('histories().length');i++)validateFragment(run(`page='history';historyIndex=${i};header()+heritagePage()+footer()`),'heritage '+i);for(const key of ['mouse','pigs','chickens'])for(let i=0;i<3;i++)validateFragment(run(`page='explore';selectedArt='${key}';selectedDetail=${i};header()+explore()+footer()`),'detail '+key+'/'+i);});
check('six complete chapters meet the requested reading lengths and cite structured sources',()=>{const chapters=run('HERITAGE_CHAPTERS'),sources=run('HERITAGE_SOURCES');assert.equal(chapters.length,6);for(const c of chapters){const intro=c.intro.trim().split(/\s+/).length,deeper=c.deeper.join(' ').trim().split(/\s+/).length;console.log(`  ${c.id}: ${intro} + ${deeper} words`);assert(intro>=70&&intro<=90,c.id+' introduction length');assert(deeper>=160&&deeper<=220,c.id+' deeper story length');assert(c.sources.length>=2);for(const id of c.sources){assert(sources[id]?.url.startsWith('https://'));assert(sources[id].publisher);assert(sources[id].date);}assert(c.imageNote);}});
check('art data and standalone SVG studies are identical',()=>{for(const key of ['mouse','pigs','chickens']){const data=run(`ART_DATA.${key}`);assert.equal(data,fs.readFileSync(path.join(root,'assets',key+'.svg'),'utf8'));for(const color of ['red','blue','yellow','white','black'])assert(data.includes('id="layer-'+color+'"'));}});
check('misalignment prevents printing with a corrective message',()=>{run(`render=()=>{};lang='en';studio={stage:3,art:'mouse',coated:true,inspected:[0,1,2,3,4],layers:0,mode:'independent',block:0,offsetX:14,offsetY:-10};press();`);assert.equal(run('studio.layers'),0);assert.match(nodes.get('#print-feedback').textContent,/not aligned/);});
check('incorrect block order leaves the paper unchanged',()=>{run('studio.offsetX=0;studio.offsetY=0;studio.block=2;press();');assert.equal(run('studio.layers'),0);assert.match(nodes.get('#print-feedback').textContent,/out of sequence/);});
check('five registered color impressions finish the print',()=>{for(let i=0;i<5;i++){run(`studio.block=${i};studio.offsetX=0;studio.offsetY=0;press();`);assert.equal(run('studio.layers'),i+1);}assert.match(nodes.get('#print-feedback').textContent,/black contours/);run('press()');assert.equal(run('studio.layers'),5);});
check('final reveal persists the exhibition record',()=>{run('stageTo(4)');assert.equal(run('studio.stage'),4);assert.equal(run('completed.art'),'mouse');assert.equal(JSON.parse(storage.get('dongho-completed')).art,'mouse');});
check('quiz questions have valid answers and explanations in both languages',()=>{for(const language of ['en','vi']){const qs=run(`lang='${language}';quizzes()`);assert.equal(qs.length,3);for(const q of qs){assert(q.options[q.answer]);assert(q.why.length>50);}run('quizIndex=3;quizAnswers=[0,1,2]');assert(run('quiz()').includes('3 / 3'));}});
check('restricted storage uses a safe fallback',()=>{context.localStorage.getItem=()=>{throw Error('blocked');};context.localStorage.setItem=()=>{throw Error('blocked');};assert.equal(run('safeGet("x",17)'),17);run('save("x",42)');});
const lum=hex=>{const a=hex.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2];};
check('gateway, history, primary controls, and guide contrast',()=>{for(const [a,b] of [['302b32','faf9f5'],['766879','faf9f5'],['7c6c80','faf9f5'],['755d7d','faf9f5'],['ffffff','795187'],['fffaf5','b93e3c'],['ffffff','6e4685'],['745180','eee3f5']]){const ratio=(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);assert(ratio>=4.5,`${a}/${b}: ${ratio}`);}});
check('file-page handoff restores language, artwork, and completed print without storage',()=>{
 const h={language:'vi',selected:'pigs',work:{stage:4,art:'pigs',layers:5,coated:true,inspected:[0,1,2,3,4],mode:'guided',block:4,offsetX:0,offsetY:0},completed:{art:'pigs',name:'Test maker',date:'2026-11-05'}};
 const isolated={console,URLSearchParams,setTimeout,clearTimeout,localStorage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},location:{hash:'#studio='+encodeURIComponent(JSON.stringify(h)),protocol:'file:'},document:{body:{dataset:{page:'exhibition'}},querySelector(){return element();},querySelectorAll(){return[];}},addEventListener(){}};
 isolated.window=isolated;vm.createContext(isolated);vm.runInContext(source.replace(/\nrender\(\);\s*$/,'\n'),isolated);
 assert.equal(vm.runInContext('lang',isolated),'en');assert.equal(vm.runInContext('selectedArt',isolated),'pigs');assert.equal(vm.runInContext('studio.layers',isolated),5);assert.equal(vm.runInContext('completed.name',isolated),'Test maker');
});
console.log(`\n${checks} checks passed. Browser rendering and real input behavior remain manual checks; see QA.md.`);

