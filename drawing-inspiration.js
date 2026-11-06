/* Contemporary, original drawing studies. Moods are chosen by the visitor. */
const INSPIRATION_MOODS=[
 {id:'joyful',label:'Joyful',color:'#c85e49',hint:'A little brightness, in your own way.'},
 {id:'calm',label:'Calm',color:'#427d6a',hint:'Room for quiet shapes and open space.'},
 {id:'sad',label:'Sad',color:'#5e789d',hint:'There is room for this feeling, too.'},
 {id:'energetic',label:'Energetic',color:'#ad7627',hint:'Follow a shape that wants to move.'},
 {id:'reflective',label:'Reflective',color:'#80649b',hint:'Let an ordinary scene become a story.'},
 {id:'unsure',label:'Not sure',color:'#88718e',hint:'A small idea is enough to begin.'}
];
const drawingStepDefaults=[{tool:'ink',size:8,color:'#342544'},{tool:'ink',size:8,color:'#342544'},{tool:'ink',size:4,color:'#342544'},{tool:'brush',size:24,color:'#237c6b'},{tool:'ink',size:4,color:'#342544'}];
function drawingExample(id,mood,title,description,parts,rows,accent='#237c6b'){
 return {id,mood,title,description,parts,steps:rows.map((row,i)=>({...drawingStepDefaults[i],title:row[0],body:row[1],tip:row[2]||'Use the reference as an invitation. Your own version belongs here.',...(i===3?{color:accent}:{})}))};
}
const DRAWING_EXAMPLES=[
 drawingExample('garden-bird','joyful','Garden Bird','A round little bird, a leaf, and a bright patch of sky.',[
  '<path d="M40 174q100-10 235 0"/><circle cx="248" cy="45" r="17" fill="#edb34c" stroke="none"/>',
  '<path d="M87 151q-31-35-11-70q13-19 34-15q11-32 39-23q27 8 20 34l30 13-29 13q-5 59-60 58Z" fill="#e6ae85"/><path d="M85 133l-43-23 14 43 41-6M110 163l-4 19m29-21 5 20"/>',
  '<circle cx="151" cy="68" r="3" fill="#342544"/><path d="M100 99q36-16 42 17q-27 24-42-17Zm7 5 24 12m-20 1 12 9"/>',
  '<path d="M212 175q30-34 32-77m-14 47q-34-10-30-34q31 2 30 34Zm9-28q30 0 35-25q-29-2-35 25Z" fill="#6fa78c"/>',
  '<path d="M53 53v12m-6-6h12M193 56l8 4m-5-9 1 13M90 157l10-6m15 10 8-7"/><circle cx="65" cy="179" r="2" fill="#342544"/>'
 ],[
  ['A place for a small bird','Choose a spot a little left of center for your bird. Imagine a leaf beside it and leave some sky above. Begin with a light line for the ground.'],
  ['Give the bird a round body','Draw a generous oval, a smaller head, and a triangular beak. Let a few short lines become a tail and two little feet.','Loose, rounded shapes are welcome. Try another line if you want to.'],
  ['An eye, a wing, a character','Add one eye and a curved wing. Use two or three short strokes inside the wing to suggest feathers without filling every space.'],
  ['A bright bird and a green leaf','Use a broad brush for a coral body or jade wing. Give the leaf its own green. Bring the brush size down near the eye and beak.'],
  ['A few marks of delight','Add a sun or a few small marks in the sky. Revisit the lines you want to keep, and give your little garden bird a name.']
 ],'#d65a48'),
 drawingExample('blooming-garden','joyful','Blooming Garden','Three flowers growing at their own playful angles.',[
  '<path d="M40 186q110-16 239 0M90 180q7-45-5-85m74 86q-4-50 5-111m61 111q0-45 11-80"/>',
  '<path d="M77 70q-29-24-31-3q-2 17 28 17q-29 15-11 27q15 10 24-19q7 31 24 17q16-12-14-26q32 0 27-21q-5-17-29 9q5-34-14-31q-19 3-4 30Z" fill="#e99c87"/><circle cx="87" cy="81" r="11" fill="#edb34c"/><path d="M159 45q-26-21-27-2q0 15 23 14q-25 15-9 26q15 9 20-17q9 25 23 12q13-12-13-22q27-2 20-18q-7-15-24 10q1-27-13-24q-14 3 0 21Z" fill="#cbb1df"/><circle cx="166" cy="55" r="8" fill="#edb34c"/><circle cx="240" cy="88" r="23" fill="#e99c87"/>',
  '<circle cx="240" cy="88" r="9" fill="#edb34c"/><path d="M235 66v12m17-6-8 10m18 6h-12m4 16-9-9m-8 14 1-12m-16 2 10-7m-14-11 12 5"/>',
  '<path d="M88 151q-33-9-35-33q28 0 35 33Zm75-23q33-8 39-34q-32 1-39 34Zm63 33q-30-3-39-26q28-5 39 26Z" fill="#6fa78c"/>',
  '<path d="M68 183l-7-11m18 8-1-13m96 16 7-11m72 12 8-10M39 48l7 4m-4-8 1 12"/><circle cx="128" cy="148" r="3" fill="#d65a48" stroke="none"/>'
 ],[
  ['Leave room for a garden','Place three flowers at different heights. Start with gently bending stems so the garden feels as though it is growing rather than standing in a row.'],
  ['Let the flowers open','Draw a circle at the top of each stem. Add rounded or pointed petals around it; each flower can have its own shape.'],
  ['Find a rhythm in the petals','Add a small center and a few short lines. Repeat a curve or a dot across the flowers, leaving some petals open and simple.'],
  ['Give each flower a little color','Try coral petals, a golden center, and jade leaves. A lilac flower can sit beside them. Your garden can use any colors you choose.'],
  ['Keep a little wildness','Add a small bud, a blade of grass, or a tiny seed. Emphasize a few stem lines, then name the garden you have grown.']
 ]),
 drawingExample('dancing-fish','joyful','Dancing Fish','Two fish turning toward one another in a swirl of water.',[
  '<path d="M46 176q42-18 80-2t85-1q32-14 63 0M63 192q54-14 102-3t83-5"/>',
  '<path d="M50 97q61-55 115 0q-54 51-115 0Zm5 0-26-30v61Zm224 20q-56-52-108 0q52 49 108 0Zm-4 0 25-28v56Z" fill="#edc177"/>',
  '<circle cx="144" cy="96" r="3" fill="#342544"/><circle cx="191" cy="117" r="3" fill="#342544"/><path d="M135 80q-12 18 0 33m64-12q10 16 0 31M83 78q23 16 0 35m157-14q-22 18 0 37"/>',
  '<path d="M87 70l20-22 18 27m-39 46 22 21 15-25M244 90l-18-22-18 25m35 38-18 24-16-20" fill="#d67e77"/><circle cx="155" cy="43" r="7" fill="#9ec4c8"/><circle cx="177" cy="62" r="4" fill="#9ec4c8"/>',
  '<path d="M63 92l8 9m10-12 8 10m9-11 8 9M260 114l-8 9m-10-13-8 10m-10-12-7 9M122 174q28-10 52 0"/>'
 ],[
  ['Imagine a little dance','Leave space in the middle of the paper and picture two fish turning toward each other. Begin with a loose curve to suggest their water.'],
  ['Two bodies, two directions','Draw two long almond shapes. Add a fan-shaped tail at the narrow end of each, turning the fish in different directions.'],
  ['Give the fish their faces','Add an eye near each head, a curved gill line, and a small side fin. Notice how a few lines can make each fish look alive.'],
  ['Color the fins and water','Try golden bodies with coral fins, or swap those colors. A few pale blue bubbles can suggest water without coloring the whole page.'],
  ['Let the marks move together','Add a few repeated scale marks and a flowing water line. Keep a space between the fish so their dance has somewhere to go.']
 ],'#edb34c'),
 drawingExample('sleeping-cat','calm','Sleeping Cat','A curled-up cat resting on a soft oval cushion.',[
  '<ellipse cx="159" cy="174" rx="108" ry="19" fill="#e0d3e9" stroke="none"/>',
  '<path d="M70 153q-18-49 26-68q53-25 112 2q44 17 43 57q-2 31-44 32H109q-28 0-39-23Z" fill="#edc498"/><path d="M89 105 91 59l32 21q27-4 45 11l22-20 2 45q-3 32-55 34q-44 0-48-45Z" fill="#edc498"/>',
  '<path d="M111 111q10 8 20 0m17 0q10 8 20 0m-34 12 6 4 7-4m-7 4v7m-1 0q-6 7-11 0m12 0q6 7 11 0M100 124l-22-4m24 12-22 4m87-11 22-3m-23 11 20 5"/>',
  '<path d="M207 119q52 2 31 38q-18 27-53 5q-20-13-13-27" fill="none" stroke="#bd8c68" stroke-width="13"/><path d="M108 92l-9-16m60 23 19-12" stroke="#d99c91" stroke-width="7"/>',
  '<path d="M58 54h15l-13 16h16M209 44h21l-18 22h22" stroke="#8f7ca3" stroke-width="2"/><path d="M113 161h21m14 1h20"/>'
 ],[
  ['A quiet place to curl up','Imagine your cat resting on an oval cushion. Place that soft oval low on the page and leave a little air above it.'],
  ['Round shapes for a resting cat','Draw a broad curved body, then a smaller head with two pointed ears. Join the head gently to the body instead of making every edge sharp.'],
  ['Close the eyes with a curve','Use two short, curved lines for closed eyes. Add a small nose and a few whiskers. Let the expression be as simple as you like.'],
  ['Wrap the tail around','Use a wider brush to curl a warm-colored tail along the body. A lavender cushion can sit beneath your cat; lighter ear shapes add contrast.'],
  ['Let the page rest, too','Add a paw line or a small sleeping mark. Keep some of the page open, and decide which outlines you would like to make a little clearer.']
 ],'#9d87d5'),
 drawingExample('lotus-pond','calm','Lotus Pond','A lotus flower, broad leaves, and gentle rings on water.',[
  '<path d="M40 172q42-13 82 0t82 0t75 0M65 189q54-10 98 0t83-1"/>',
  '<path d="M158 157q-3-28 0-53M158 109q-40-17-39-52q31 5 39 38q3-42 27-57q15 39-18 66q35-31 59-16q-10 31-59 28q-42 6-72-15q21-23 63 8Z" fill="#e6a4ad"/>',
  '<path d="M161 101q11-21 23-45m-26 46-28-34m33 40 42-14M152 113h18"/>',
  '<path d="M114 164q-74-33-75 7q19 30 75-7Zm72 5q61-37 84-10q-11 35-84 10Z" fill="#74a98e"/><path d="M49 169l52-4m96 3 58-9"/>',
  '<path d="M108 180q48 13 96-1M149 143l-12 9m29-13 12 13"/><circle cx="74" cy="132" r="3" fill="#edb34c" stroke="none"/>'
 ],[
  ['Make a little room for water','Begin with two gently curving water lines. Choose where your lotus will sit and leave a clear space around its flower.'],
  ['Open the lotus from the center','Draw a narrow central petal, then let two or three wider petals open beside it. Add a slim stem down toward the water.'],
  ['Follow the direction of each petal','Use a fine pen to add a light line inside each petal. Let those lines turn toward the middle rather than copying the same straight stroke.'],
  ['Broad leaves, a soft flower','Add two broad leaves on the water. Try jade for the leaves and rose or lilac for the flower, leaving the water mostly uncolored.'],
  ['Just a ripple or two','Place a few ripples around the stem and one small dot of gold if you like. Give your pond a title that feels like your own scene.']
 ]),
 drawingExample('moonlit-river','calm','Moonlit River','A broad river, a distant bank, and a moon reflected below.',[
  '<path d="M28 160q65-58 118-11q57 34 145-1M27 183q86-33 143-5q50 17 120-9"/>',
  '<circle cx="213" cy="56" r="29" fill="#efd39a"/><path d="M30 125q36-44 67-21q38-40 72-3q38-20 63 12q37-23 59 8" fill="#c2b5cf" stroke="none"/>',
  '<path d="M44 136q38-11 75-1m99 8h37m-57 10h40m-48 11h45m-35 12h29" stroke="#6f86a6"/>',
  '<path d="M62 169q3-35-17-57m16 40-21-9m20-5-17-12m22 29 17-14" stroke="#59866f" stroke-width="4"/><path d="M178 46q13-6 22 0m35-14q11-6 21 0" stroke="#9a88aa"/>',
  '<path d="M206 96h15m-21 7h27m-31 7h35M88 183l9-5m9 1 12-4"/><circle cx="151" cy="38" r="2" fill="#342544"/>'
 ],[
  ['Let the river take its time','Draw two wide curves for the river. Give the water more space than the distant bank so the scene can feel open.'],
  ['A moon above a faraway bank','Place a round moon high on one side. Draw a low, simple bank beneath it with a few gently rising shapes.'],
  ['Bring the moon into the water','Add short, broken lines below the moon for its reflection. Let those lines become a little wider as they come toward you.'],
  ['A few cool colors','Try lilac on the distant bank, a pale gold moon, and a little jade on the reeds. The river can stay the color of your paper.'],
  ['Leave a little silence','Add one reed, a small star, or another short ripple. Stop where the scene feels complete to you, even if much of the paper is still open.']
 ],'#477da9'),
 drawingExample('rainy-window','sad','Rainy Window','A window, drifting raindrops, and a small warm light.',[
  '<path d="M56 183h210"/><path d="M78 31h164v150H78z" fill="#dce4ed"/>',
  '<path d="M89 42h142v129H89zM160 42v129M90 107h141" fill="none" stroke="#7f678e" stroke-width="6"/>',
  '<path d="M112 59l-4 10m26-14-4 10m54-1-4 11m30-15-4 10M117 126l-4 11m26-9-4 10m52-9-4 11m29-13-4 10" stroke="#6b8eaf"/>',
  '<path d="M167 181v-26h42v26" fill="#dfb780"/><path d="M187 154q-12-20 0-29q12 13 0 29Z" fill="#eaa75e"/><path d="M107 179q3-21 24-21q13 8 10 21Z" fill="#a9c5b7"/>',
  '<path d="M84 27q-16 68 0 137M235 27q16 69 0 137M174 165h29m-29 9h29"/><circle cx="131" cy="164" r="2" fill="#342544"/>'
 ],[
  ['A window for today','Place a tall window on your page. You can draw the weather you see, remember, or imagine; there is no need to explain the feeling behind it.'],
  ['Build a simple frame','Draw a large rectangle with a smaller one inside. Add a vertical line and a crossbar if you would like separate panes.'],
  ['Let the rain find its own rhythm','Add a few slanted drops. Vary their distance and length, leaving some parts of the window clear.'],
  ['A little color on the sill','Try pale blue outside and a warm golden shape on the windowsill. It could be a lamp, a cup, or something entirely your own.'],
  ['Keep the details you want','Add a curtain line or a small object beside the frame. Choose a title for this moment, or leave the drawing untitled.']
 ],'#477da9'),
 drawingExample('branch-bird','sad','Bird on a Branch','A small bird with plenty of sky around its branch.',[
  '<path d="M37 161q104 7 244-26m-87 14 39 26m-112-18-31-21" stroke="#9d8268" stroke-width="5"/>',
  '<path d="M126 137q-26-31-10-57q10-15 24-10q8-27 30-22q22 5 17 29l20 9-23 9q-5 41-40 45Z" fill="#a7bdcc"/><path d="M129 131l-34-9 14 27 27-10M145 140l1 17m17-19 4 16"/>',
  '<circle cx="173" cy="68" r="2.6" fill="#342544"/><path d="M139 96q26-12 31 14q-19 15-31-14Zm5 5 15 9"/>',
  '<path d="M234 146q20-30 38-19q-3 21-38 19Z" fill="#8eb19c"/><path d="M63 65l-4 10m22-14-4 10m177 9-4 11" stroke="#99b2cd"/>',
  '<path d="M48 175q57 3 97-5M116 53l5-5m83 72 6-2"/><circle cx="222" cy="52" r="4" fill="#d9c1a5" stroke="none"/>'
 ],[
  ['A small bird, a large sky','Draw a gently bending branch and imagine one small bird on it. Leave plenty of room around the bird if that is the scene you want.'],
  ['Let the bird settle','Use a rounded body and a smaller head. Add a beak, a tail, and two fine feet reaching down to the branch.'],
  ['A few quiet features','Place an eye and one curved wing. A short feather line or a small tilt of the head can give your bird its own character.'],
  ['Choose the colors of your moment','Try a blue or lilac bird with a single jade leaf. You can also keep the whole drawing in dark ink.'],
  ['Let one detail be enough','Add a leaf, a drop, or a little mark in the sky. Your bird does not need a story that anyone else understands.']
 ],'#477da9'),
 drawingExample('sheltered-seedling','sad','Sheltered Seedling','A young plant beneath a broad, leaf-shaped shelter.',[
  '<path d="M63 187q94-14 194 0"/><path d="M151 179q9-25 3-56" stroke="#5f8d71" stroke-width="4"/>',
  '<path d="M153 154q-35-3-42-28q33-7 42 28Zm4-15q31-5 37-29q-31-4-37 29Z" fill="#91b89a"/>',
  '<path d="M155 148l-30-14m34-3 23-13"/><path d="M82 84q70-79 151 0q-76-25-151 0Z" fill="#d1c0df"/><path d="M158 60v43q0 14-12 9"/>',
  '<path d="M67 47l-5 12m32-27-5 12m144-3-5 12m27 8-5 12M57 104l-4 11m209-15-4 11" stroke="#92acc7"/><path d="M119 181l10-9m45 6 10-7" stroke="#ac8b63"/>',
  '<path d="M91 82q34-13 68-10t65 10M83 193q76-8 148 0"/><circle cx="204" cy="161" r="3" fill="#edb34c" stroke="none"/>'
 ],[
  ['A place for a new leaf','Choose a small patch of ground for a seedling. Leave room above it for a broad leaf, umbrella, or shelter of your own invention.'],
  ['Grow two little leaves','Draw a slim stem and two pointed oval leaves. Let the leaves turn in slightly different directions.'],
  ['Give the plant a shelter','Add a broad curve above the seedling. A few simple lines can make it an umbrella, an oversized leaf, or an imaginary roof.'],
  ['Color the plant and its surroundings','Try jade for the leaves and lilac for the shelter. A few blue rain marks can sit outside the sheltered space.'],
  ['Notice the small things','Add a line inside each leaf or a seed near the ground. Leave the parts you like simple, and choose whether your scene needs anything else.']
 ]),
 drawingExample('sunrise-rooster','energetic','Sunrise Rooster','A proud rooster greeting a bright, rising sun.',[
  '<path d="M34 183h249"/><path d="M211 91a36 36 0 1 1 59 0" fill="#edc264" stroke="none"/>',
  '<path d="M107 149q-21-44 14-61q25-4 32-31q12-28 34-13q24 16 0 36q-9 9-10 31q-3 48-44 50Z" fill="#edc177"/><path d="M180 57l23 9-23 8M126 160l-6 23m26-24 6 23"/>',
  '<path d="M158 44q-15-24-1-26q12-2 12 18q4-27 15-17q10 9-4 22" fill="#d97768"/><circle cx="178" cy="55" r="3" fill="#342544"/><path d="M123 110q28-11 32 17q-24 20-32-17Z"/>',
  '<path d="M108 125q-54-6-64-61q36 3 59 33q-22-42 2-64q26 28 16 65" fill="#73a98c"/><path d="M52 74q28 21 48 44m7-72q8 27 3 51"/>',
  '<path d="M209 37l-8-9m40-9v-12m30 28 9-8m-161 96 15 5m-11 0 13 5M111 183h17m16 0h17"/>'
 ],[
  ['Leave space for a bold greeting','Imagine your rooster standing tall, with a sun behind it. Place a ground line low on the page and choose which way the bird will face.'],
  ['Build a proud silhouette','Draw a rounded body, an upright neck, and a small head. Add a sharp beak and two steady legs.'],
  ['A comb, an eye, a curved wing','Give your rooster a bright comb shape. Add an eye and a wing made from one generous curve.'],
  ['Let the tail spread','Use large, sweeping feather shapes for the tail. Try jade against a golden body and a coral comb, or invent a stronger contrast.'],
  ['A few rays of your own','Add sun rays and a handful of feather lines. Make the outlines as lively as you want, then name your rooster.']
 ],'#edb34c'),
 drawingExample('leaping-carp','energetic','Leaping Carp','A curved fish jumping above wide, flowing waves.',[
  '<path d="M28 174q38-27 74-2t76-1t111-1M42 194q45-20 84-1t81-4t69-2" stroke="#6b99a8"/>',
  '<path d="M110 145q-12-70 73-100q14 72-64 106Zm1-2-37-9 23 35 22-18Z" fill="#edbd73"/>',
  '<circle cx="171" cy="66" r="3" fill="#342544"/><path d="M150 64q9 8 18 13m-34-3q8 13 23 14m-32 0q8 15 23 16m-31 0q8 14 21 15m-27 0q7 13 17 13"/>',
  '<path d="M126 84l-20-6 2 33m40-3 27 11-26 16" fill="#d77d72"/><path d="M193 150l7-11m-20 4 3-13m30 26 9-7" stroke="#74a0ba"/>' ,
  '<path d="M180 49l10-8m-7 23 11-3M75 182q23-10 43 0m53 9q26-10 51 0"/><circle cx="224" cy="112" r="5" fill="#b5cbd9" stroke="none"/>'
 ],[
  ['Give the jump a direction','Picture a curved fish moving upward. Draw one sweeping arc for its direction and leave room for waves below.'],
  ['Curve the body into the leap','Build a long, curved body around that movement. Add a fan tail at the lower end and a rounded head at the top.'],
  ['A rhythm of scales','Add an eye and a short gill line. Use a few repeated curves for scales, letting them follow the bend of the body.'],
  ['Bring color into the movement','Try gold on the body and coral on the fins. Wide blue or jade strokes can suggest the water below.'],
  ['A splash and a finishing line','Add a few drops and one or two wave curls. Strengthen the edges that show the leap most clearly, leaving the other marks lighter.']
 ],'#edb34c'),
 drawingExample('swirling-dragon','energetic','Swirling Dragon','An invented dragon following a long, curling line.',[
  '<path d="M45 143q34-106 98-48t97-25" stroke="#8cbd9b" stroke-width="27"/>',
  '<path d="M238 77q-6-35 20-39l12 13 21 1-7 18-28 11-5 19-17-3Z" fill="#d8b16c"/><path d="M49 142l-20 15 22 4M120 85l-10-25m49 44 1-28m48 15 12 20"/>',
  '<circle cx="268" cy="55" r="3" fill="#342544"/><path d="M270 70l25 8m-47-31-4-18m16 12 4-17M68 113l13 8m9-27 10 11m23-7 9 13m15 4 8 13m17-7 6 13m16-13 5 12"/>',
  '<path d="M58 118l-9-17 17 1m17-14-2-18 17 7m21-4 8-14 9 17m24 14 16-9 1 19m26 3 18 3-9 13" fill="#d97b6b"/>',
  '<path d="M107 69l-15-7m69 14 9-10m50 45 9 4M257 79q5 24 23 21M42 49l9 3m-4-8 1 12"/><circle cx="278" cy="124" r="6" fill="#edb34c" stroke="none"/>'
 ],[
  ['Follow one lively line','Start with a long, curling line across the page. This will be the movement of an imaginary dragon, so it can turn in any direction you like.'],
  ['Build a creature around the curve','Make the body wider around your line. Add a head, a pointed tail, and a few bending legs. Your dragon can have its own unusual shape.'],
  ['Invent a face and a pattern','Add an eye, horns, and whiskers. Try a few repeated marks along the body instead of filling it with tiny scales.'],
  ['Give the dragon a bold contrast','Choose jade or lilac for the body and coral for a few back fins. Let a bright accent sit beside a quieter color.'],
  ['Keep the swirl moving','Return to the long curve with a fine pen. Add a small cloud or a floating dot, then decide which parts of the creature deserve your darkest lines.']
 ]),
 drawingExample('banyan-tree','reflective','Old Banyan Tree','A wide tree with roots, hanging lines, and a place beneath it.',[
  '<path d="M35 185q121-14 254 0"/>',
  '<path d="M139 175q15-44 6-86h37q-12 48 6 87l22 9h-88Z" fill="#bf9b78"/><path d="M83 111q-47-7-28-38q-7-30 33-34q20-30 54-13q36-27 65-1q47-4 46 32q39 16 15 46q-11 21-50 12q-37 20-69 1q-43 18-66-5Z" fill="#9fbd96"/>',
  '<path d="M153 102l-28-36m42 32 32-38m-38 55-1 57m-6-13-13 18m29-24 13 25M77 99v53m23-47v63m116-56v50m23-53v32"/>',
  '<path d="M75 72q17-13 35-2m25-23q23-10 39 1m32 12q20-9 30 6m-126 28q25-12 42 2m32-6q20-10 35 0" stroke="#5e8d6b" stroke-width="6"/>',
  '<path d="M66 179h40m124-3h27M88 167l6-8m119 17 7-9"/><circle cx="63" cy="131" r="3" fill="#edb34c" stroke="none"/>'
 ],[
  ['A place to pause beneath a tree','Picture a broad tree and the open space underneath it. Draw a low ground line and decide how much of the page its canopy will hold.'],
  ['A trunk that carries a wide canopy','Draw a sturdy trunk and let large rounded leaf masses spread to either side. The canopy can be uneven and still feel connected.'],
  ['Trace a little history in the bark','Add a few branching lines, roots, and long hanging marks. Vary their length, keeping some areas of the trunk simple.'],
  ['Gather the leaves into colors','Try two related greens for the canopy and a warm brown or gold for the trunk. Use broad color shapes rather than drawing every leaf.'],
  ['Make room for a small detail','Add a stone, a fallen leaf, or a place to sit. Give your tree a title or leave a little of its story unspoken.']
 ]),
 drawingExample('moon-boat','reflective','Boat Beneath the Moon','A small boat beneath a large moon and a very open sky.',[
  '<path d="M31 177q75-17 139 0t118-2M48 194q87-12 167-1"/>',
  '<circle cx="211" cy="54" r="34" fill="#e8c98f"/><path d="M70 151h121l-19 23H91Z" fill="#c09572"/>',
  '<path d="M130 149V76l-47 67h47Zm4-3h43l-43-56Z" fill="#e9dced"/><path d="M74 151h112m-53-7v-41"/>',
  '<path d="M194 112h33m-42 12h52m-42 11h40m-33 9h27" stroke="#b29ec0" stroke-width="4"/><path d="M39 64q32-10 56 0" stroke="#8b9fad"/>',
  '<path d="M87 182q40 8 79 0M75 35l7 4m-3-9-1 13"/><circle cx="144" cy="41" r="2" fill="#342544"/>'
 ],[
  ['A small boat in a large scene','Leave a broad space for the sky. Place a low water line and imagine a small boat resting beneath a much larger moon.'],
  ['A moon and a boat','Draw a round moon, then a long shallow shape for the boat. Let their different sizes give the scene its balance.'],
  ['Give the boat a simple sail','Add a slim mast and one or two triangular sails. You can leave the boat empty or invent someone to travel in it.'],
  ['A little moonlight on the water','Try a gold moon, a warm boat, and pale lilac reflections. Broken horizontal marks can suggest light without filling the river.'],
  ['Choose the last quiet mark','Add a ripple near the boat or one small star. Notice which spaces you would like to leave untouched, then name your scene.']
 ],'#9d87d5'),
 drawingExample('field-path','reflective','Path Through Fields','A winding path between colored fields and distant hills.',[
  '<path d="M27 181q77-73 135-55q66-53 130 0" fill="#c3c9b1" stroke="none"/>',
  '<path d="M127 205q-18-53 38-69q44-15 27-33m-5 102q-71-49-15-61q50-14 20-41" fill="#e1c79c"/>',
  '<path d="M33 160l65 12m-51 4 48 7m-31 3 31 8M214 145l66 17m-76 1 71 17m-68-1 53 16" stroke="#739471"/>',
  '<path d="M69 129v-29m-20 10q18-36 41 1Z" fill="#90ae83"/><circle cx="246" cy="48" r="23" fill="#e4c18b"/><path d="M38 111q48-57 93-10q38-49 78-6" fill="#b9a7c9" stroke="none"/>',
  '<path d="M121 163l-10 4m37-21-10 4m43-29-5 4M74 190l1-11m8 14 1-11M246 174l2-9m8 12 2-9"/>'
 ],[
  ['Imagine where a path might lead','Place a faraway horizon and picture a path moving toward it. Leave the destination open to your imagination.'],
  ['Let the path wind through','Draw two curves that are wider near you and come closer together in the distance. They do not need to match perfectly.'],
  ['Give the fields a rhythm','Add a few lines across the fields on either side. Let them turn with the land rather than drawing a strict grid.'],
  ['Choose the colors of the landscape','Try jade fields, lilac hills, and a warm gold path. A broad brush can keep the land in simple color areas.'],
  ['One detail along the way','Add a tree, a few grasses, or a small mark on the path. Choose a title that hints at where your own path might go.']
 ]),
 drawingExample('single-leaf','unsure','A Single Leaf','One curved leaf with room to try a few simple marks.',[
  '<path d="M83 187q54-63 141-136" stroke="#9f8268"/>',
  '<path d="M101 167q-38-94 121-123q13 132-121 123Z" fill="#9fbd96"/>',
  '<path d="M105 163 211 55m-87 89-7-36m29 17 1-40m14 24 21-5m-38 23 29 1"/>',
  '<path d="M112 156q2-50 83-90q-19 66-83 90Z" fill="#75a991" stroke="none"/>',
  '<path d="M78 187l-7 9M67 86l7 3m-3-8 1 12"/><circle cx="240" cy="161" r="5" fill="#edb34c" stroke="none"/>'
 ],[
  ['One small idea is enough','Choose a place for one leaf. Begin with a single curved line; the leaf can grow around it in the next step.'],
  ['Bring two curves together','Draw a curve along one side of the stem and another on the other side. Let them meet in a soft point.'],
  ['A few lines inside the leaf','Add short veins branching from the center. Try fewer lines first, leaving space between them.'],
  ['Try one color, or two','Use jade on one side of the leaf and a lighter green or gold on the other. You can keep some of the paper showing through.'],
  ['Your leaf, your little finish','Add a small stem or one dot beside the leaf. You can stop here, add another leaf, or let this become the start of a larger idea.']
 ]),
 drawingExample('little-pig','unsure','Little Pig','A round pig with a small spiral and a curling tail.',[
  '<path d="M44 180q118-13 235 0"/>',
  '<path d="M71 138q-28-39 0-68q33-30 93-13q27 3 45 25l24 2 9 18 25 10-3 23-29 3-15 33h-22l-5-25-72 7-6 22H93l-3-27Z" fill="#e8b58e"/>',
  '<path d="M203 84l-1-29q28-1 31 31M75 117q-28-32-38-9q-8 18 10 13m192-10v6m13-6v6"/><circle cx="223" cy="101" r="3" fill="#342544"/>',
  '<path d="M125 88q-29 0-28 24q1 23 27 22q21-2 19-22q-2-15-18-13q-12 1-10 13q2 8 10 5" stroke="#9b7f9f" stroke-width="5"/><path d="M203 72l12 9" stroke="#d88787" stroke-width="7"/>',
  '<path d="M107 146l8-8m84 9 7-8M67 180l9-6m167 3 12-5"/><circle cx="61" cy="53" r="4" fill="#edb34c" stroke="none"/>'
 ],[
  ['Make room for a round little animal','Imagine a pig standing sideways. Place a loose oval on the page and leave space for a snout at one end and a tail at the other.'],
  ['Add a snout and little legs','Build a broad body around the oval. Add a short snout and four small leg shapes, keeping them simple and sturdy.'],
  ['An ear, an eye, a curly tail','Draw one pointed ear, one eye, two nostril marks, and a looping tail. Each little feature can have its own character.'],
  ['A warm color and a spiral','Try coral or gold on the body. If you like, add a lilac spiral inspired by the curves you noticed in the study paintings.'],
  ['Finish with a few confident marks','Use a fine pen to bring back the snout, feet, or tail. This is your invented pig, so keep the features you like best.']
 ],'#d65a48'),
 drawingExample('abstract-garden','unsure','Abstract Garden','Leaves, circles, and playful shapes that can mean anything.',[
  '<path d="M41 183q81-11 136 1t102-6"/>',
  '<circle cx="98" cy="81" r="36" fill="#e7b7a0"/><path d="M154 158l34-94 61 86Z" fill="#bbaaD1"/><path d="M74 175q12-55 47-42q22 9 18 42Z" fill="#9bb6a0"/>',
  '<path d="M74 83q25-15 49 0M100 48v67m73 18 34-9m-27-12 16-7M87 156l39-9"/>',
  '<circle cx="253" cy="61" r="13" fill="#edb34c"/><path d="M39 128q20-30 36-15q-4 22-36 15Z" fill="#d88c9b"/><path d="M141 44q16-21 30-3q-5 17-30 3Z" fill="#73a98d"/>',
  '<path d="M211 184l2-12m8 10 3-10M38 55l8 3m-3-8 1 12M258 116l8 3m-4-9 1 12"/><circle cx="154" cy="107" r="3" fill="#342544"/>'
 ],[
  ['Let a few shapes be the beginning','Start with one circle, one curve, or a shape you cannot name. You do not need to decide what the whole picture means.'],
  ['Find some neighbors for it','Place two more shapes nearby. Try making one tall, one wide, and one small so the page has a little variety.'],
  ['Repeat a mark you enjoy','Add lines, dots, or curves inside a few shapes. Let a repeated mark connect different parts of your imagined garden.'],
  ['Choose a small family of colors','Pick two or three colors from the palette. Use them in more than one place so the shapes begin to belong together.'],
  ['Give the shapes your own meaning','Add a final leaf or a small mark. Your abstract garden can have a name, a story, or simply be a collection of shapes you enjoyed drawing.']
 ],'#9d87d5')
];
const OWN_DRAWING_STEPS=[
 ['Find the story you want to tell','Think of an animal, a place, a memory, or an invented world. Begin with one thing you would like someone to notice.'],
 ['Start with the biggest shapes','Place two or three large shapes on the page. Give them room before adding little details.'],
 ['Keep the details that matter','Add the features that help tell your story. A repeated line or curve can give the picture its own rhythm.'],
 ['Choose the colors of your idea','Pick two or three colors you enjoy together. The custom color picker is available if you want something different.'],
 ['Make the last marks yours','Emphasize a few lines, choose a title if you like, and decide whether to keep drawing, download, or exhibit your artwork.']
].map((r,i)=>({...drawingStepDefaults[i],title:r[0],body:r[1],tip:'There is room for your own way of doing this.'}));
function inspirationEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function inspirationSvg(id,step=null){
 const example=DRAWING_EXAMPLES.find(x=>x.id===id);if(!example)return '';
 const label=example.title+(step===null?' — contemporary drawing example':` — reference, step ${step+1} highlighted`);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${inspirationEscape(label)}"><title>${inspirationEscape(label)}</title><path fill="#fff6e8" d="M0 0h320v220H0z"/><g fill="none" stroke="#342544" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${example.parts.map((part,i)=>`<g data-reference-part="${i}" opacity="${step===null?1:i===step?1:i<step?.75:.22}">${part}</g>`).join('')}</g></svg>`;
}
function moodIcon(id){const common='<circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="1.6"/>';const detail={joyful:'<path d="M12 17h2m12 0h2M12 24q8 10 16 0"/>',calm:'<path d="M11 18q4 4 8 0m3 0q4 4 8 0M16 27h8"/>',sad:'<path d="M12 17h2m12 0h2M14 28q6-7 12 0M10 22q-4 5 0 6q4-1 0-6Z"/>',energetic:'<path d="M23 8l-10 15h8l-3 10 11-16h-8Z"/>',reflective:'<path d="M11 18h5m8 0h5M16 27q4 2 8 0M28 6l1-4m3 6 4-1"/>',unsure:'<path d="M16 14q0-7 7-5q8 4-1 9v4m0 5v1M12 18h1"/>'}[id]||'';return `<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${common}${detail}</g></svg>`;}
