const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

// Replace standard html, body config
const regex = /html, body\s*\{\s*overflow-x:\s*hidden;\s*\}/;
if (regex.test(content)) {
    content = content.replace(regex, "html, body { overflow-x: hidden; scrollbar-gutter: stable; }");
    fs.writeFileSync('src/index.css', content);
    console.log("CSS updated");
} else {
    // If not exactly as written, just append
    fs.appendFileSync('src/index.css', "\nhtml { scrollbar-gutter: stable; }\n");
    console.log("CSS appended");
}
