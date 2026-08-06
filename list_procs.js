const fs = require('fs');
let text = fs.readFileSync('steps_dump_utf8.json', 'utf8');
if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
}
const data = JSON.parse(text);
data.forEach(p => {
  console.log(p.slug, p.steps.length);
});
