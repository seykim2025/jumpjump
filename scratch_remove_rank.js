const fs = require('fs');
const scenePath = 'c:/JUMPJUMP/jumpjump/assets/scenes/main.scene';
const content = fs.readFileSync(scenePath, 'utf8');
const json = JSON.parse(content);

let count = 0;
for (let i = 0; i < json.length; i++) {
  const obj = json[i];
  if (obj && obj.__type__ === 'cc.Node' && obj._name === 'btn_rank') {
    obj._active = false;
    count++;
  }
}

fs.writeFileSync(scenePath, JSON.stringify(json, null, 2), 'utf8');
console.log('Disabled ' + count + ' btn_rank nodes.');
