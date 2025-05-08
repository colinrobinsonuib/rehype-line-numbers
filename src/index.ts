import { visit } from 'unist-util-visit';
import { Root, Element } from 'hast'; // Assuming HAST (HTML Abstract Syntax Tree)

// Define the types for our options
export interface RehypeLineNumbersOptions {
    scope?: 'all' | 'topLevel';
}

const rehypeLineNumbers = (options: RehypeLineNumbersOptions = {}) => {
    const { scope = 'topLevel' } = options;

    return (tree: Root) => {
        visit(tree, 'element', (node: Element, index, parent) => {

            if (node.position?.start?.line) {
                if( scope === 'all' || (scope === 'topLevel' && parent === tree)  )
                {
                    if (!node.properties) {
                        node.properties = {};
                    }
                    node.properties['data-line'] = node.position.start.line;
                }
            }
        });
    };
};

export default rehypeLineNumbers;