import { log } from 'console';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ⛔ __dirname לא קיים ב-ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🏳️ זיהוי שפה: ברירת מחדל "en"
const langArg = process.argv.find(arg => arg.startsWith('lang='));
log(`Extracting translations for language: ${langArg || 'en'}`);
const lang = langArg ? langArg.split('=')[1] : 'en';

// 🔍 נתיבים
const srcDir = path.join(__dirname, '../src');
const localePath = path.join(__dirname, `../src/locales/${lang}.json`);

const tFunctionRegex = /t\s*\(\s*(['"`])([\w\d.-]+)\1\s*\)/g;
const allKeys = new Set<string>();

const walk = (dir: string) => {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            let match;
            while ((match = tFunctionRegex.exec(content)) !== null) {
                allKeys.add(match[2]);
            }
        }
    }
};

const insertToTree = (tree: any, pathParts: string[]) => {
    const [first, ...rest] = pathParts;
    if (!first) return;
    if (rest.length === 0) {
        if (!(first in tree)) {
            tree[first] = first.charAt(0).toUpperCase() + first.slice(1);
        }
    } else {
        if (!(first in tree)) {
            tree[first] = {};
        }
        insertToTree(tree[first], rest);
    }
};

const mergeDeep = (target: any, source: any): any => {
    for (const key in source) {
        if (typeof source[key] === 'object' && key in target && typeof target[key] === 'object') {
            mergeDeep(target[key], source[key]);
        } else if (!(key in target)) {
            target[key] = source[key];
        }
    }
    return target;
};

// סריקה
walk(srcDir);

// קריאה
let existing: any = {};
if (fs.existsSync(localePath)) {
    existing = JSON.parse(fs.readFileSync(localePath, 'utf8'));
}

// השלמה
const fresh: any = {};
for (const key of allKeys) {
    insertToTree(fresh, key.split('.'));
}

const merged = mergeDeep(existing, fresh);
fs.writeFileSync(localePath, JSON.stringify(merged, null, 2), 'utf8');
log(`✅ ${lang}.json updated with ${allKeys.size} keys`);
