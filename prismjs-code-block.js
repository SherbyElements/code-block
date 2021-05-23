import { CodeBlock } from './src/code-block';

class PrismjsCodeBlock extends CodeBlock {
  constructor() {
    super();

    this.theme = 'twilight';
    this.languageFileTemplate = `/prismjs/prism-{LANGUAGE}.min.js`;
    this.themeFileTemplate = `/prismjs/prism-{THEME}.css`;
  }
}

customElements.define('code-block', PrismjsCodeBlock);
