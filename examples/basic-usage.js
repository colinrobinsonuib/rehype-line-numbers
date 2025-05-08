import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {read} from 'to-vfile'
import {unified} from 'unified'
import rehypeLineNumbers from '../dist/index.js'; // Import from compiled output

// Helper to get directory name in ES Modules
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = await read(path.join(__dirname, 'example.html'));

await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeLineNumbers)
    .use(rehypeStringify)
    .process(file)

console.log('--- Top Level Only ---');
console.log(String(file))

const file2 = await read(path.join(__dirname, 'example.html'));

await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeLineNumbers, {scope: 'all'})
    .use(rehypeStringify)
    .process(file2)

console.log('\n--- All Elements ---');
console.log(String(file2))