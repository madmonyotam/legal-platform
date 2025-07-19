import fs from 'fs';
import path from 'path';

const EXCLUDED = ['node_modules', 'dist', '.git'];

function walk(dir, prefix = '') {
  const files = fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => !EXCLUDED.includes(entry.name))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()));
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pointer = i === files.length - 1 ? '└── ' : '├── ';
    console.log(prefix + pointer + file.name);

    if (file.isDirectory()) {
      walk(path.join(dir, file.name), prefix + (i === files.length - 1 ? '    ' : '│   '));
    }
  }
}

console.log('.');
walk('.');
