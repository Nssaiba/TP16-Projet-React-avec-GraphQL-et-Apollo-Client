const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules', '@apollo', 'client', 'index.js');

try {
    if (fs.existsSync(target)) {
        console.log('File EXISTS');
        const content = fs.readFileSync(target, 'utf8');
        console.log('File Content Length:', content.length);
        console.log('File Content Start:', content.substring(0, 50));
    } else {
        console.log('File DOES NOT EXIST');
    }
} catch (e) {
    console.log('Error reading file:', e.message);
}
