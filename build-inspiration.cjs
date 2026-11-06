const fs=require('fs'),path=require('path'),vm=require('vm');
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'drawing-inspiration.js'),'utf8'),context);
const examples=vm.runInContext('DRAWING_EXAMPLES',context);const folder=path.join(__dirname,'assets','inspiration');fs.mkdirSync(folder,{recursive:true});
for(const item of examples)fs.writeFileSync(path.join(folder,item.id+'.svg'),vm.runInContext(`inspirationSvg(${JSON.stringify(item.id)})`,context));
console.log(`${examples.length} original local drawing references generated.`);
