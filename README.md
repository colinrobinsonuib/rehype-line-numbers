# rehype-line-numbers

[![npm version](https://badge.fury.io/js/rehype-line-numbers.svg)](https://badge.fury.io/js/rehype-line-numbers)

A [rehype](https://github.com/rehypejs/rehype) plugin to add `data-line` attributes to HTML elements, indicating their starting line number in the source.

## What this is

This plugin inspects the HAST (HTML Abstract Syntax Tree) and, for elements with positional information, adds a `data-line` attribute.

## Installation

```bash
pnpm install rehype-line-numbers
```

## Use

See `examples/` for a working example.

Say we have the following file `example.html`:

```html
<h1>Example</h1>
<p>This is a <strong>paragraph!</strong></p>

<p>Lorem ipsum</p>

<div>
    <p>A thing</p>
    <p>Another thing</p>
</div>

<em>the end.</em>
```

…and our module `example.js` looks as follows:

```js
const file = await read('example.html');

await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeLineNumbers)
    .use(rehypeStringify)
    .process(file)

console.log('--- Top Level Only ---');
console.log(String(file))

const file2 = await read('example.html');

await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeLineNumbers, {scope: 'all'})
    .use(rehypeStringify)
    .process(file2)

console.log('\n--- All Elements ---');
console.log(String(file2))
```

Now running `node example.js` yields:

```html
--- Top Level Only ---
<h1 data-line="1">Example</h1>
<p data-line="2">This is a <strong>paragraph!</strong></p>

<p data-line="4">Lorem ipsum</p>

<div data-line="6">
    <p>A thing</p>
    <p>Another thing</p>
</div>

<em data-line="11">the end.</em>

--- All Elements ---
<h1 data-line="1">Example</h1>
<p data-line="2">This is a <strong data-line="2">paragraph!</strong></p>

<p data-line="4">Lorem ipsum</p>

<div data-line="6">
    <p data-line="7">A thing</p>
    <p data-line="8">Another thing</p>
</div>

<em data-line="11">the end.</em>
```

## API

### `rehypeDataLine(options?)`

`options: RehypeLineNumbersOptions`

`interface RehypeLineNumbersOptions {
    scope?: 'all' | 'topLevel';
}`

Determines which elements receive the `data-line` attribute.
- `'topLevel'`: (default) Only elements that are direct children of the root of the document tree.
- `'all'`: All elements in the document tree that have line information.

## Compatibility
This plugin is ESM-only.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT